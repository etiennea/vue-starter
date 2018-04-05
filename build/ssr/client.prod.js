const merge = require('webpack-merge');
const config = require('./client.dev');

module.exports = merge(config, {
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
