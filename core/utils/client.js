/**
 * Tota11y
 */
if (process.env.NODE_ENV === 'development' && process.client) {
  require('tota11y/build/tota11y.min');
}

export const startApp = async context => {
  const { app, router, store } = context;

  if (!process.ssr) {
    await store.dispatch('httpRequest', context);
  }

  router.onReady(() => {
    /**
     * Handling asyncData() method
     */
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      let diffed = false;

      const activated = matched.filter((component, i) => {
        return diffed || (diffed = prevMatched[i] !== component);
      });
      if (!activated.length) {
        return next();
      }
      Promise.all(
        activated.map(c => {
          if (c.asyncData) {
            return c.asyncData({
              ...context,
              route: to,
            });
          }
        }),
      )
        .then(() => {
          next();
        })
        .catch(next);
    });

    /**
     * Mount app
     */
    app.$mount('#app');

    // Remove loader in SPA mode
    if (!process.ssr) {
      const loader = document.querySelector('.spa-loading');
      if (loader) loader.remove();
    }
  });
};
