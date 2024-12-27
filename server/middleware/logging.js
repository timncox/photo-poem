export function requestLogger(req, res, next) {
  const start = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, {
    headers: req.headers,
    ip: req.ip,
    origin: req.get('origin')
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response ${res.statusCode}`, {
      duration: `${duration}ms`,
      method: req.method,
      url: req.url,
      contentLength: res.get('content-length')
    });
  });

  next();
}