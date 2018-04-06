export default {
  namespaced: true,

  state: () => ({
    links: [],
  }),
  mutations: {
    setLinks(state, value) {
      state.links = value;
    },
  },
};
