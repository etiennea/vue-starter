import Vue from 'vue';
import App from './App';

import './meta';
import { createRouter } from './router';
import { createStore } from './store';
import { createI18n } from './i18n';

export function createApp(context) {
  const router = createRouter();
  const store = createStore();
  const i18n = createI18n();

  const app = new Vue({ router, store, i18n, context, render: h => h(App) });

  return { app, router, store };
}
