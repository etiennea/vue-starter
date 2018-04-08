const babelLoader = require('./babel');
const tsLoader = require('./ts');
// const sassLoader = require('./sass');

const vueLoader = {
  loader: 'vue-loader',
  options: {
    extractCss: true,
    loaders: {
      js: babelLoader,
      ts: tsLoader,
      // scss: sassLoader,
    },
  },
};

module.exports = vueLoader;
