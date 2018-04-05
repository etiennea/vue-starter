import './pwa';

/**
 * Tota11y
 */
if (process.env.NODE_ENV === 'development' && process.client) {
  require('tota11y/build/tota11y.min');
}

export const startApp = ({ app, router, store }) => {
  router.onReady(() => {
    /**
     * Handling asyncData() method
     */
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      let diffed = false;

      if (store.state.error) store.commit('CLEAR_ERROR');

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
              store,
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
  });
};
