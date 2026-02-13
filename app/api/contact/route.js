import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value) {
  return value.trim().replace(/[<>]/g, '');
}

function isString(value) {
  return typeof value === 'string';
}

export async function POST(req) {
  try {
    const body = await req.json();

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
