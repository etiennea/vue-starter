const { join } = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const CriticalCSS = require('html-webpack-critical-plugin');
const WebpackBar = require('webpackbar');
const HtmlPlugin = require('html-webpack-plugin');

// Base paths
const rootPath = join(__dirname, '..');
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
    rules: [...require('./rules.prod')],
  },
  plugins: [
    new WebpackBar({
      name: 'SPA: production',
    }),
    new HtmlPlugin({
      template: join(srcPath, 'index.html'),
    }),
    ...require('./plugins.prod'),
    new CriticalCSS(),
  ],
});

module.exports = prodConfig;
