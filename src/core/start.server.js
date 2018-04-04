export const startApp = ({ app, router, store, context }) => {
  return new Promise((resolve, reject) => {
    // Attach meta for SSR
    context.meta = app.$meta();

    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      Promise.all(
        matchedComponents.map(component => {
          return (
            component.asyncData &&
            component.asyncData({
              ...context,
              app,
              store,
              route: router.currentRoute,
            })
          );
        }),
      )
        .then(() => {
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
