import Vue from 'vue';
import VueI18n from 'vue-i18n';
import i18nConfig from '~/i18n';

Vue.use(VueI18n);

export const createI18n = () => {
  return new VueI18n(i18nConfig);
};
