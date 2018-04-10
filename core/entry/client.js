/**
 * HMR
 */
if (process.env.NODE_ENV === 'development' && process.client)
  if (module.hot) module.hot.accept();

import Vue from 'vue';
import { createApp } from '../app';
import { startApp } from '../utils/client';
import errorHandler from '../utils/errorHandler';
import initApp from '~/';

/**
 * Vue start
 */
(async () => {
  // Create application
  const context = createApp();

  Vue.config.errorHandler = (error, vm, info) => {
    errorHandler(context, { error, vm, info });
  };

  // Call app init
  await initApp(context);

  // Start application
  return startApp(context);
})();
