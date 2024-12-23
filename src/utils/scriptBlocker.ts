export function blockThirdPartyScripts() {
  try {
    // Check if property exists and is configurable
    const descriptor = Object.getOwnPropertyDescriptor(window, 'ethereum');
    if (!descriptor || descriptor.configurable) {
      Object.defineProperty(window, 'ethereum', {
        value: undefined,
        writable: false,
        configurable: false
      });
    }
  } catch (error) {
    console.warn('Failed to block ethereum property:', error);
  }
}