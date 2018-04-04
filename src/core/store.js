import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
  const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
  });

  if (process.client && process.ssr) {
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__);
    }
  }

  return store;
}
