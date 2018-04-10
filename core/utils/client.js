import Vue from 'vue';
import { resolveComponentsAsyncData, handleHMRAsyncData } from './asyncData';
import errorHandler from './errorHandler';

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
   * Handling asyncData() method on route change
   */
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    resolveComponentsAsyncData(to, matched, context)
      .then(() => {
        next();
      })
      .catch(error => {
        errorHandler(context, { error });
        next(error);
      });
  });

  /**
   * Handling HMR
   */
  if (process.dev) {
    handleHMRAsyncData(context);
  }

  router.onReady(async () => {
    // SPA call first asyncData
    if (!process.ssr) {
      const components = router.getMatchedComponents();
      await resolveComponentsAsyncData(
        router.currentRoute,
        components,
        context,
      );
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
