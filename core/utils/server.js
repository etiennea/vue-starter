import { getComponentAsyncData, applyAsyncData } from './asyncData';

/**
 * Start application
 */
export const startApp = async context => {
  const { app, router, store, http } = context;

  return new Promise((resolve, reject) => {
    // Attach meta for SSR
    http.meta = app.$meta();

    // Http asyncData
    http.asyncData = {};

    router.push(http.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      Promise.all(
        matchedComponents.map(component => {
          return getComponentAsyncData(component, context).then(data => {
            applyAsyncData(component, data);
            return data;
          });
        }),
      )
        .then(data => {
          http.asyncData = data;
          http.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
