import { SERVER_CONFIG } from './constants.js';

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin matches any allowed patterns
    const isAllowed = SERVER_CONFIG.ALLOWED_ORIGINS.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      }
      // Handle regex patterns
      return allowed.test?.(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: SERVER_CONFIG.CORS_MAX_AGE,
  optionsSuccessStatus: 200
};