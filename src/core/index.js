import 'reflect-metadata';
import 'vue-class-component';
import 'vue-property-decorator';
import 'vuex-class';
import '~/vueclass';
import '../plugins';

// import 'core-js/library/modules/es6.symbol';

import Vue from 'vue';
import { createApp } from './app';

// Production tip
Vue.config.productionTip = process.env.NODE_ENV === 'production';

// Create app
const { app, router } = createApp();

/**
 * Router ready & mounting app
 */
router.onReady(() => {
  app.$mount('#app');
});

/**
 * Hot Module Replacement
 */
if (process.env.NODE_ENV === 'development') {
  if (module.hot) module.hot.accept();
}

/**
 * Workbox servuce work
 */
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          // eslint-disable-next-line
          console.log('Service worker registered: ', registration);
        })
        .catch(registrationError => {
          // eslint-disable-next-line
          console.error('Service worker  failed: ', registrationError);
        });
    });
  }
}

// Include babel runtime in base chunk
// eslint-disable-next-line
const babelFakeAsync = async () => {};

// Export main app
export default app;
