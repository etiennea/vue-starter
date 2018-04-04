const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlPlugin = require('html-webpack-plugin');

// Base paths
const rootPath = join(__dirname, '../..');
const srcPath = join(rootPath, 'src');

module.exports = merge(config, {
  module: {
    rules: [...require('../rules.dev')],
  },
  plugins: [
    new WebpackBar({
      name: 'SSR: Client',
    }),
    new HtmlPlugin({
      template: join(srcPath, 'index.tpl.html'),
      filename: 'index.ssr.html',
    }),
    new webpack.DefinePlugin({
      'process.ssr': 'true',
      'process.client': 'true',
    }),
    new VueSSRClientPlugin(),
  ],
});
