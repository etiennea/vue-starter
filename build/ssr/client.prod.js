const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.prod');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': "'client'",
      'process.client': 'true',
      'process.server': 'false',
    }),
    new VueSSRClientPlugin(),
  ],
});
