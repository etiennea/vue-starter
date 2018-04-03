import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueMeta from 'vue-meta';

/**
 * i18n
 */
Vue.use(VueI18n);

/**
 * Meta
 */
Vue.use(VueMeta, {
  keyName: 'head',
});
