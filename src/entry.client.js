/**
 * HMR
 */
if (process.env.NODE_ENV === 'development' && process.client)
  if (module.hot) module.hot.accept();

/**
 * Vue start
 */
import { createApp } from './core';
import { startApp } from './core/start.client';

// Create application
const { app, router, store } = createApp();

// Start application
startApp({ app, router, store });

/**
 * App code
 */
import 'assets/scss/index.scss';
import './layouts/DefaultLayout';
import './components/NavBar';

if (!process.ssr) {
  document.querySelector('.spa-loading').remove();
}
