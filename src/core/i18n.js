import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '~/i18n.yml';

Vue.use(VueI18n);

export const createI18n = () => {
  return new VueI18n({ locale: 'en', messages });
};
