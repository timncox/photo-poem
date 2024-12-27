export function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', `
    default-src 'self';
    img-src 'self' data: blob:;
    script-src 'self';
    style-src 'self' 'unsafe-inline';
    connect-src 'self';
    worker-src 'self' blob:;
  `.replace(/\s+/g, ' ').trim());
  
  next();
}