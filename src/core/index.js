import 'reflect-metadata';
import 'vue-class-component';
import 'vue-property-decorator';
import 'vuex-class';
import '~/vueclass';
import '~/vuets';
import Vue from 'vue';
import { createApp } from './app';

// Production tip
Vue.config.productionTip = process.env.NODE_ENV != 'production';

/**
 * Tota11y
 */
if (process.env.NODE_ENV === 'development' && process.client) {
  require('tota11y/build/tota11y.min');
}

/**
 * Workbox service work
 */
if (process.env.NODE_ENV === 'production' && process.client) {
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

export { createApp };
