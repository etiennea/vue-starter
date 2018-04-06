const devServer = require('webpack-serve');
const config = require('../spa/spa.dev');
const project = require('../../project');

const { host, port } = project.server.dev;

devServer({
  config,
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
