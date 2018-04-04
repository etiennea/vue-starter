const merge = require('webpack-merge');
const config = require('./ssr.dev');

const serverConfig = merge(config, {
  mode: 'development',
});

module.exports = serverConfig;
