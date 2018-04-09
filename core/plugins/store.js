import Vue from 'vue';
import Vuex from 'vuex';
import * as baseStore from '~/store';

Vue.use(Vuex);

export function createStore() {
  const store = new Vuex.Store(baseStore);

  if (process.client && process.ssr && window.__DATA__) {
    const { state } = window.__DATA__;
    store.replaceState(state);
  }

  return store;
}
