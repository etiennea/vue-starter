export default (context, data) => {
  const { store, router } = context;
  // eslint-disable-next-line
  console.error(data.error);
  data.from = router.currentRoute;
  store.commit('error/SET', data);
};
