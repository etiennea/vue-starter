/**
 * Workbox service work
 */
if (process.client && 'serviceWorker' in navigator) {
  if (process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js');
  } else {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}
