/**
 * App code
 */
import 'assets/scss/index.scss';

/**
 * Workbox service work
 */
if (process.client && 'serviceWorker' in navigator) {
  if (process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/service-worker.js');
  } else {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}

/**
 * Init function
 */
// eslint-disable-next-line
export default async ({ app, store, router, http }) => {};
