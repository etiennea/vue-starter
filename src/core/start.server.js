export const startApp = ({ app, router, store, ssrContext }) => {
  return new Promise((resolve, reject) => {
    // Attach meta for SSR
    ssrContext.meta = app.$meta();

    router.push(ssrContext.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      Promise.all(
        matchedComponents.map(component => {
          return (
            component.asyncData &&
            component.asyncData({
              ...ssrContext,
              app,
              store,
              router,
              route: router.currentRoute,
            })
          );
        }),
      )
        .then(() => {
          ssrContext.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
