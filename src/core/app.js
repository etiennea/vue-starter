import Vue from 'vue';
import App from './App';
import VueI18n from 'vue-i18n';
import messages from '~/i18n.yml';

import { createRouter } from './router';
import { createStore } from './store';

export function createApp() {
  const router = createRouter();
  const store = createStore();

  const i18n = new VueI18n({
    locale: 'fr',
    messages,
  });

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  });

  return { app, router, store };
}
