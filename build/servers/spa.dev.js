const devServer = require('webpack-serve');
const getConfig = require('../webpack.config');
const { getServerOptions } = require('../utils');

const { host, port } = getServerOptions(true);

devServer({
  config: getConfig(),
  host,
  port,
  stats: false,
  logLevel: 'silent',
  dev: {
    logLevel: 'silent',
    quiet: true,
  },
  hot: {
    logLevel: 'silent',
  },
});
