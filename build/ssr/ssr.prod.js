const merge = require('webpack-merge');
const config = require('./ssr.dev');

const serverConfig = merge(config, {
  devtool: '#source-map',
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});

module.exports = serverConfig;
