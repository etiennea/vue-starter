import NavStore from './modules/nav';

// Modules
export const modules = {
  nav: NavStore,
};

// Main store
export const state = () => ({});
export const mutations = {};
export const actions = {
  async httpRequest(state, context) {
    state.commit('nav/setLinks', [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
    ]);
  },
};
export const getters = {};
