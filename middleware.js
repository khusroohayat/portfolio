// middleware.js for security headers
import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  // Determine if in development
  const isDev = process.env.NODE_ENV === 'development';
  // Content Security Policy
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
    : "script-src 'self' 'unsafe-inline';";
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "img-src 'self' data: https:;",
      scriptSrc,
      "style-src 'self' 'unsafe-inline';",
      "font-src 'self' data:;",
      "object-src 'none';",
      "frame-ancestors 'none';",
      "base-uri 'self';",
      "form-action 'self';",
      "require-trusted-types-for 'script';",
    ].join(' ')
  );
  // HSTS
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  // COOP
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  // X-Frame-Options
  response.headers.set('X-Frame-Options', 'DENY');
  // Trusted Types
  response.headers.set('Permissions-Policy', 'interest-cohort=()');
  return response;
}

export const config = {
  matcher: '/:path*',
};
