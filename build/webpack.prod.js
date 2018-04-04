const merge = require('webpack-merge');
const config = require('./webpack.base');

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
  plugins: [...require('./plugins.prod')],
});

module.exports = prodConfig;
