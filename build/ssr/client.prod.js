const merge = require('webpack-merge');
const config = require('./client.dev');

module.exports = merge(config, {
  module: {
    rules: [...require('../rules.prod')],
  },
  plugins: [...require('../plugins.prod')],
});
