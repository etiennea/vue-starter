import Vue from 'vue';
import { resolveComponents } from './asyncData';

/**
 * Tota11y
 */
if (process.env.NODE_ENV === 'development' && process.client) {
  require('tota11y/build/tota11y.min');
}

/**
 * asyncData from server
 */
Vue.mixin({
  created() {
    if (process.ssr) {
      if (this.$router && window.__DATA__) {
        const matched = this.$router.getMatchedComponents();
        if (!matched.length) return;
        matched.forEach((component, i) => {
          component.extendOptions.__DATA__ = window.__DATA__.components[i];
        });
        window.__DATA__ = null;
      }
    }

    const ctor = this.constructor;
    if (ctor.extendOptions && ctor.extendOptions.asyncData) {
      Object.assign(this.$data, ctor.extendOptions.__DATA__);
    }
  },
});

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

    resolveComponents(to, activated, context)
      .then(() => {
        next();
      })
      .catch(next);
  });

  router.onReady(async () => {
    // SPA call fisrt asyncData
    if (!process.ssr) {
      const components = router.getMatchedComponents();
      await resolveComponents(router.currentRoute, components, context);
    }

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
