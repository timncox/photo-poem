export const APP_CONSTANTS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    QUALITY: 0.8
  },
  UI: {
    LOADING_DELAY: 300,
    ERROR_DISPLAY_DURATION: 5000
  }
} as const;