import Vue from 'vue';
import Router from 'vue-router';
import routes from '../routes';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: process.ssr ? 'history' : 'hash',
    routes: [...routes],
  });
}
