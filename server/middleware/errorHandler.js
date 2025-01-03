export function errorHandler(err, req, res, next) {
  const timestamp = new Date().toISOString();
  
  // Detailed error logging
  console.error(`[${timestamp}] Server Error:`, {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    headers: req.headers,
    origin: req.get('origin'),
    ip: req.ip
  });
  
  // Check for specific error types
  if (err.message.includes('API key is not configured')) {
    return res.status(503).json({
      error: 'Service temporarily unavailable. Please try again later.',
      timestamp
    });
  }
  
  // Don't expose internal error details in production
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message || 'Internal server error';
  
  res.status(statusCode).json({ 
    error: message,
    timestamp,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}