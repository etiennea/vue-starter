const { getPath } = require('./utils');

module.exports = {
  // Libs paths
  vue$: 'vue/dist/vue.runtime.esm.js',

  // App paths
  '~': getPath('app'),
  '~~': getPath(),
  assets: getPath('assets'),
  static: getPath('assets/static'),

  // Helpers
  vueclass: getPath('helpers/vueclass.js', 'core'),
  vuets: getPath('helpers/vuets.ts', 'core'),
  storeModule: getPath('helpers/storeModule.js', 'core'),
};
