const merge = require('webpack-merge');
const config = require('./client.dev');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const clientConfig = merge(config, {
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
  plugins: [...require('../plugins.prod')],
});

clientConfig.plugins.forEach((plugin, index) => {
  if (plugin instanceof FriendlyErrors) {
    clientConfig.plugins.splice(index, 1);
  }
});

module.exports = clientConfig;
