export const startApp = async context => {
  const { app, router, store, http } = context;

  return new Promise((resolve, reject) => {
    // Attach meta for SSR
    http.meta = app.$meta();

    router.push(http.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      Promise.all(
        matchedComponents.map(component => {
          return (
            component.asyncData &&
            component.asyncData({
              ...context,
              route: router.currentRoute,
            })
          );
        }),
      )
        .then(() => {
          http.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
