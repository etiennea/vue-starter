const merge = require('webpack-merge');
const config = require('./webpack.base');
const WebpackBar = require('webpackbar');

module.exports = merge(config, {
  module: {
    rules: [...require('./rules.dev')],
  },
  plugins: [
    new WebpackBar({
      name: 'SPA: development',
    }),
  ],
});
