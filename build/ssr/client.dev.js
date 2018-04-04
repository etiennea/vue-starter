const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(config, {
  module: {
    rules: [...require('../rules.dev')],
  },
  plugins: [
    new WebpackBar({
      name: 'SSR: Client',
    }),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': "'client'",
      'process.ssr': 'true',
      'process.client': 'true',
      'process.server': 'false',
    }),
    new VueSSRClientPlugin(),
  ],
});
