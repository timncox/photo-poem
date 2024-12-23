export function blockThirdPartyScripts() {
  try {
    // Only block if property doesn't exist
    if (!Object.getOwnPropertyDescriptor(window, 'ethereum')) {
      Object.defineProperty(window, 'ethereum', {
        value: undefined,
        configurable: false,
        writable: false
      });
    }
  } catch (error) {
    console.warn('Failed to block ethereum property:', error);
  }
}