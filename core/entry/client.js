/**
 * HMR
 */
if (process.env.NODE_ENV === 'development' && process.client)
  if (module.hot) module.hot.accept();

import { createApp } from '../app';
import { startApp } from '../utils/client';
import initApp from '~/';

/**
 * Vue start
 */
(async () => {
  // Create application
  const context = createApp();

  // Call app init
  await initApp(context);

  // Start application
  return startApp(context);
})();

// Remove loader in SPA mode
if (!process.ssr) {
  const loader = document.querySelector('.spa-loading');
  if (loader) loader.remove();
}
