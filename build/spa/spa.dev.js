const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
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
      name: 'SPA: development',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.client': 'true',
    }),
    new HtmlPlugin({
      template: join(srcPath, 'index.spa.html'),
    }),
  ],
});
