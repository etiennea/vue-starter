import Vue from 'vue';
import Router from 'vue-router';
import routes from '~/routes';
import ErrorPage from '../Error';

Vue.use(Router);

if (process.client && process.ssr) {
  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({ store: this.$store, route: to })
          .then(next)
          .catch(next);
      } else {
        next();
      }
    },
  });
}

export function createRouter() {
  return new Router({
    mode: process.ssr ? 'history' : 'hash',
    routes: [
      {
        path: '/error',
        component: ErrorPage,
      },
      ...routes,
    ],
  });
}
