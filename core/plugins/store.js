import Vue from 'vue';
import Vuex from 'vuex';
import * as baseStore from '~/store';

Vue.use(Vuex);

export function createStore() {
  if (!baseStore.modules) baseStore.modules = {};

  // Error module
  baseStore.modules.error = {
    namespaced: true,
    state: () => ({
      current: {},
    }),
    mutations: {
      SET(state, value) {
        state.current = value;
      },
      CLEAR(state) {
        state.current = {};
      },
    },
    getters: {
      current(state) {
        return state.current;
      },
    },
  };

  const store = new Vuex.Store(baseStore);

  if (process.client && process.ssr && window.__DATA__) {
    const { state } = window.__DATA__;
    store.replaceState(state);
  }

  return store;
}
