import { resolveComponentsAsyncData } from './asyncData';

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
      resolveComponentsAsyncData(
        router.currentRoute,
        matchedComponents,
        context,
      )
        .then(data => {
          http.asyncData = data;
          http.state = store.state;
          resolve(app);
        })
        .catch(error => {
          store.commit('error/SET', {
            error: error.stack || error.messagae || error,
            statusCode: 500,
          });
          http.state = store.state;
          http.error = error;
          resolve(app);
        });
    }, reject);
  });
};
