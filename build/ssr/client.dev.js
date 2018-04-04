const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
const HtmlPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

// Base paths
const rootPath = join(__dirname, '../..');
const srcPath = join(rootPath, 'src');

module.exports = merge(config, {
  module: {
    rules: [...require('../rules.dev')],
  },
  plugins: [
    new HtmlPlugin({
      template: join(srcPath, 'index.html'),
      filename: 'index.spa.html',
    }),
    new WebpackBar({
      name: 'SSR: Client',
    }),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': "'client'",
      'process.client': 'true',
      'process.server': 'false',
    }),
    new VueSSRClientPlugin(),
  ],
});
