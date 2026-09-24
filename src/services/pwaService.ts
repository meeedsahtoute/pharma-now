// PWA Service Worker Registration & Installation Helper

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (reg) => {
          console.log('[PHARMA NOW] ServiceWorker registered with scope: ', reg.scope);
        },
        (err) => {
          console.error('[PHARMA NOW] ServiceWorker registration failed: ', err);
        }
      );
    });
  }
}
