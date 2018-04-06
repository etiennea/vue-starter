const merge = require('webpack-merge');
const config = require('./ssr.dev');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const serverConfig = merge(config, {
  devtool: '#source-map',
  mode: 'production',
});

serverConfig.plugins.forEach((plugin, index) => {
  if (plugin instanceof FriendlyErrors) {
    serverConfig.plugins.splice(index, 1);
  }
});

module.exports = serverConfig;
