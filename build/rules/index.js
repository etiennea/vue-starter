const { getPath, getDefaultBuildOptions } = require('../utils');
const cacheLoader = require('./loaders/cache');
const babelLoader = require('./loaders/babel');
const tsLoader = require('./loaders/ts');
const vueLoader = require('./loaders/vue');
const htmlLoader = require('./loaders/html');
const mdLoader = require('./loaders/md');
const cssLoader = require('./loaders/css');

const app = getPath('.', 'app');
const core = getPath('.', 'core');

module.exports = (BUILD = getDefaultBuildOptions()) => {
  const rules = [
    { test: /\.jsx?$/, include: [core, app], use: [cacheLoader, babelLoader] },
    { test: /\.tsx?$/, include: [core, app], use: [cacheLoader, tsLoader] },
    { test: /\.vue$/, include: [core, app], use: [cacheLoader, vueLoader] },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: { name: 'img/[name].[hash].[ext]' },
    },
    {
      test: /\.woff2?(\?.*)?$/,
      use: {
        loader: 'file-loader',
        options: { name: 'fonts/[name].[hash].[ext]' },
      },
    },
    { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.ya?ml$/,
      use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
    },
    { test: /\.html$/, use: [htmlLoader], exclude: [/index\.(spa|ssr)\.html/] },
    { test: /\.md/, use: mdLoader },
    {
      test: /\.css$/,
      use: cssLoader(BUILD),
    },
    { test: /\.scss$/, use: cssLoader(BUILD, 'sass') },
  ];

  return rules;
};
