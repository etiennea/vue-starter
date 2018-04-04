const { join } = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const WebpackBar = require('webpackbar');
const HtmlPlugin = require('html-webpack-plugin');

// Base paths
const rootPath = join(__dirname, '..');
const srcPath = join(rootPath, 'src');

module.exports = merge(config, {
  module: {
    rules: [...require('./rules.dev')],
  },
  plugins: [
    new HtmlPlugin({
      template: join(srcPath, 'index.html'),
    }),
    new WebpackBar({
      name: 'SPA: development',
    }),
  ],
});
