export function blockThirdPartyScripts() {
    // Prevent third-party scripts from modifying window.ethereum
    Object.defineProperty(window, 'ethereum', {
      value: undefined,
      configurable: false,
      writable: false
    });
  }
