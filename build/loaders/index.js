const babelLoader = require('./babel');
const tsLoader = require('./ts');
const vueLoader = require('./vue');
const cssLoader = require('./css');
const sassLoader = require('./sass');
const htmlLoader = require('./html');
const cacheLoaer = require('./cache');

module.exports = {
  babelLoader,
  tsLoader,
  vueLoader,
  cssLoader,
  sassLoader,
  cacheLoaer,
  htmlLoader,
};
