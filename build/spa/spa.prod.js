const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
const HtmlPlugin = require('html-webpack-plugin');

// Base paths
const rootPath = join(__dirname, '../..');
const srcPath = join(rootPath, 'src');

const prodConfig = merge(config, {
  devtool: '#source-map',
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [...require('../rules.prod')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.client': 'true',
    }),
    new WebpackBar({
      name: 'SPA: production',
    }),
    new HtmlPlugin({
      template: join(srcPath, 'index.spa.html'),
    }),
    ...require('../plugins.prod'),
  ],
});

module.exports = prodConfig;
