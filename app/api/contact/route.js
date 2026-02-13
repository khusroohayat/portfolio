import { NextResponse } from 'next/server';
// SMTP config from environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || SMTP_USER;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value) {
  return value.trim().replace(/[<>]/g, '');
}

function isString(value) {
  return typeof value === 'string';
}

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON payload. Please provide valid JSON in the request body.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { message: 'Invalid request payload. Please submit Name, Email, and Message as text.' },
        { status: 400 }
      );
    }

    const { name: rawName, email: rawEmail, message: rawMessage } = body;

    if (![rawName, rawEmail, rawMessage].every(isString)) {
      return NextResponse.json(
        { message: 'Invalid request payload. Please submit Name, Email, and Message as text.' },
        { status: 400 }
      );
    }

    const name = sanitize(rawName);
    const email = sanitize(rawEmail);
    const message = sanitize(rawMessage);

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Please complete Name, Email, and Message before submitting.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 2000) {
      return NextResponse.json(
        { message: 'One or more fields are too long. Please shorten your message and try again.' },
        { status: 400 }
      );
    }

    // Send email via nodemailer (dynamic import for test mocking compatibility)
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `Portfolio Contact <${CONTACT_FROM_EMAIL}>`,
        to: CONTACT_TO_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Contact form email send error:', err);
      return NextResponse.json(
        { message: 'Your message could not be sent. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Thanks for reaching out! I will reply as soon as possible.',
    });
  } catch {
    return NextResponse.json(
      { message: 'We could not submit your message right now. Please try again.' },
      { status: 500 }
    );
  }
}
