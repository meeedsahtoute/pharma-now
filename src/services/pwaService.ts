// PWA Service Worker Registration, Cache Invalidation & Device Recovery Helper

const RECOVERY_KEY = 'pharma_now_auto_recovered_v2';

export function registerServiceWorker() {
  if (typeof window === 'undefined') return;

  // Global listener for asset load failures (e.g. 404 on old hashed JS/CSS assets)
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        console.warn('[PHARMA NOW] Asset load failure detected. Triggering safe cache recovery...');
        autoRecoverDeviceOnce();
      }
    },
    true
  );

  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PHARMA NOW] ServiceWorker registered with scope:', reg.scope);

          // Force SW update check on load
          reg.update();

          // Handle SW updates
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PHARMA NOW] New ServiceWorker content available; activating...');
                  installingWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              };
            }
          };
        })
        .catch((err) => {
          console.error('[PHARMA NOW] ServiceWorker registration failed:', err);
        });

      // Auto-reload when new controller takes over
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
}

/**
 * Emergency Recovery Function:
 * Unregisters all Service Workers, deletes all browser Caches, and reloads the application.
 */
export async function clearAppCacheAndReload() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }

    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    sessionStorage.setItem(RECOVERY_KEY, 'done');
  } catch (e) {
    console.warn('[PHARMA NOW] Error clearing caches:', e);
  } finally {
    window.location.reload();
  }
}

/**
 * Auto-recovers the device once per browser session if a broken asset/cache is detected.
 */
export async function autoRecoverDeviceOnce() {
  if (typeof window === 'undefined') return;
  const alreadyRecovered = sessionStorage.getItem(RECOVERY_KEY);
  if (!alreadyRecovered) {
    console.warn('[PHARMA NOW] Performing 1-time auto cache purge & reload for broken assets.');
    sessionStorage.setItem(RECOVERY_KEY, 'true');
    await clearAppCacheAndReload();
  }
}
