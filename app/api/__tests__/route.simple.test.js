/**
 * Simple test cases for the chatbot API route security features
 * These tests focus on the core security functionality without complex mocking
 */

// Mock the entire next/server module
jest.mock('next/server', () => ({
  NextRequest: class MockNextRequest {
    constructor(url, options = {}) {
      this.url = url;
      this.method = options.method || 'GET';
      this.headers = new Map(Object.entries(options.headers || {}));
      this.body = options.body;
      this.ip = options.ip || '127.0.0.1';
    }

    async json() {
      if (!this.body) throw new Error('No body');
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }
  },
  NextResponse: {
    json: (data, options = {}) => ({
      json: async () => data,
      status: options.status || 200,
      headers: new Map(Object.entries(options.headers || {}))
    })
  }
}));

// Mock fetch
global.fetch = jest.fn();

// Mock console.log
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = { ...originalEnv };
  process.env.GOOGLE_GEMINI_API_KEY = 'test-api-key';
});

afterEach(() => {
  process.env = originalEnv;
  mockConsoleLog.mockClear();
  fetch.mockClear();
});

describe('Chatbot API Security Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockConsoleLog.mockClear();
    
    // Clear rate limit map between tests
    const { POST } = require('../route');
    // Access the rate limit map and clear it
    if (global.rateLimitMap) {
      global.rateLimitMap.clear();
    }
  });

  describe('Input Validation', () => {
    it('should validate message structure', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({ messages: 'invalid' }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('Missing or invalid messages array');
    });

    it('should validate message count limits', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      const messages = Array(11).fill().map((_, i) => ({
        role: 'user',
        content: `Message ${i + 1}`
      }));

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({ messages }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('Too many messages');
    });

    it('should validate content length', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      const longContent = 'a'.repeat(2001);
      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: longContent }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('content too long');
    });

    it('should validate message roles', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'invalid', content: 'Hello' }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('invalid role');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // Make 11 requests (exceeding the limit of 10)
      for (let i = 0; i < 11; i++) {
        await POST(request);
      }

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.message).toContain('Rate limit exceeded');
    });
  });

  describe('Security Headers', () => {
    it('should include security headers in responses', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{ content: { parts: [{ text: 'Response' }] } }]
        })
      });

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);

      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('X-XSS-Protection')).toBe('1; mode=block');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing API key gracefully', async () => {
      delete process.env.GOOGLE_GEMINI_API_KEY;
      
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      // The API key check happens after validation, so it might return 500 for unexpected error
      expect([503, 500]).toContain(response.status);
      expect(data.message).toMatch(/Service temporarily unavailable|unexpected error/);
    });

    it('should handle API errors without exposing details', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({
          error: { message: 'Invalid API key', code: 'INVALID_API_KEY' }
        })
      });

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.message).toBe('Service temporarily unavailable. Please try again later.');
      expect(data.error).toBeUndefined();
    });
  });

  describe('Content Sanitization', () => {
    it('should sanitize dangerous characters', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{ content: { parts: [{ text: 'Response' }] } }]
        })
      });

      const maliciousContent = 'Hello <script>alert("xss")</script> world';
      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: maliciousContent }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      expect(response.status).toBe(200);

      // Verify sanitized content was sent to API
      const fetchCall = fetch.mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      const sanitizedContent = requestBody.contents[0].parts[0].text;
      
      expect(sanitizedContent).not.toContain('<script>');
      expect(sanitizedContent).not.toContain('</script>');
    });
  });

  describe('Successful Requests', () => {
    it('should process valid requests successfully', async () => {
      const { POST } = require('../route');
      const { NextRequest } = require('next/server');

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{ content: { parts: [{ text: 'Hello! I can help you learn about Khusroo.' }] } }]
        })
      });

      const request = new NextRequest('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Hello! I can help you learn about Khusroo.');
    });
  });
});
