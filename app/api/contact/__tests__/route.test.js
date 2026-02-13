jest.mock('next/server', () => ({
  NextResponse: {
    json: (data, options = {}) => ({
      json: async () => data,
      status: options.status || 200,
    }),
  },
}));

describe('/api/contact POST', () => {
  it('returns 400 for non-string field values instead of throwing', async () => {
    const { POST } = require('../route');

    const req = {
      json: async () => ({ name: {}, email: 'a@b.com', message: 'hi' }),
    };

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toContain('Invalid request payload');
  });

  it('accepts valid string values', async () => {
    const { POST } = require('../route');

    const req = {
      json: async () => ({ name: 'Test User', email: 'a@b.com', message: 'Hello there' }),
    };

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toContain('Thanks for reaching out');
  });
});
