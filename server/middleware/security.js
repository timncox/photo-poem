export function securityHeaders(req, res, next) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Set CSP for production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Content-Security-Policy', `
      default-src 'self';
      img-src 'self' data: blob:;
      script-src 'self';
      style-src 'self' 'unsafe-inline';
      connect-src 'self';
      worker-src 'self' blob:;
    `.replace(/\s+/g, ' ').trim());
  } else {
    // More permissive CSP for development
    res.setHeader('Content-Security-Policy', `
      default-src 'self';
      img-src 'self' data: blob: *;
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      connect-src 'self' http://localhost:* https://localhost:* data: blob:;
      worker-src 'self' blob:;
    `.replace(/\s+/g, ' ').trim());
  }
  
  next();
}