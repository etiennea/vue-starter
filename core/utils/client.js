import Vue from 'vue';
import { getComponentAsyncData, applyAsyncData } from './asyncData';

/**
 * Tota11y
 */
if (process.env.NODE_ENV === 'development' && process.client) {
  require('tota11y/build/tota11y.min');
}

/**
 * asyncData from server
 */
if (process.ssr) {
  Vue.mixin({
    created() {
      if (this.$router && window.__DATA__) {
        const matched = this.$router.getMatchedComponents();
        if (!matched.length) return;
        matched.forEach((component, i) => {
          component.extendOptions.__DATA__ = window.__DATA__.components[i];
        });
        // window.__DATA__ = null;
      }

      const ctor = this.constructor;
      if (ctor.extendOptions && ctor.extendOptions.asyncData) {
        Object.assign(this.$data, ctor.extendOptions.__DATA__);
      }
    },
  });
}

/**
 * Start application
 */
export const startApp = async context => {
  const { app, router, store } = context;

  if (!process.ssr) {
    await store.dispatch('httpRequest', context);
  }

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
      activated.map(component => {
        if (component.options.asyncData) {
          return getComponentAsyncData(component, {
            ...context,
            route: to,
          }).then(data => {
            if (data) applyAsyncData(component, data);
            return data;
          });
        }
      }),
    )
      .then(() => {
        next();
      })
      .catch(next);
  });

  router.onReady(() => {
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
