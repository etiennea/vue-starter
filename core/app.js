import Vue from 'vue';
import App from './App';

import './plugins/meta';
import { createRouter } from './plugins/router';
import { createStore } from './plugins/store';
import { createI18n } from './plugins/i18n';

export function createApp(httpContext) {
  const router = createRouter();
  const store = createStore();
  const i18n = createI18n();

  const app = new Vue({
    router,
    store,
    i18n,
    httpContext,
    render: h => h(App),
  });

  const context = { app, router, store };

  return context;
}
