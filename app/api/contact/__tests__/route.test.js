let nodemailer;
const sendMail = jest.fn().mockResolvedValue({});
const createTransport = jest.fn(() => ({ sendMail }));

beforeAll(async () => {
  jest.resetModules();
  jest.doMock('nodemailer', () => ({
    __esModule: true,
    createTransport,
    sendMail,
  }));
  nodemailer = await import('nodemailer');
});
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data, options = {}) => ({
      json: async () => data,
      status: options.status || 200,
    }),
  },
}));

describe('/api/contact POST', () => {
  beforeEach(() => {
    sendMail.mockClear();
    createTransport.mockClear();
  });

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

  it('returns 400 for malformed JSON payloads', async () => {
    const { POST } = require('../route');

    const req = {
      json: async () => {
        throw new SyntaxError('Unexpected end of JSON input');
      },
    };

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toContain('Invalid JSON payload');
  });

  it('accepts valid string values and sends email', async () => {
    jest.resetModules();
    const { POST } = await import('../route');

    const req = {
      json: async () => ({ name: 'Test User', email: 'a@b.com', message: 'Hello there' }),
    };

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toContain('Thanks for reaching out');
    expect(sendMail).toHaveBeenCalledTimes(1);
    const mailArgs = sendMail.mock.calls[0][0];
    expect(mailArgs.text).toContain('Test User');
    expect(mailArgs.text).toContain('a@b.com');
    expect(mailArgs.text).toContain('Hello there');
  });

  it('returns 500 if email sending fails', async () => {
    jest.resetModules();
    sendMail.mockRejectedValueOnce(new Error('SMTP fail'));
    const { POST } = await import('../route');

    const req = {
      json: async () => ({ name: 'Test User', email: 'a@b.com', message: 'Hello there' }),
    };

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toMatch(/could not be sent/i);
  });
});
