const config = require('./build/webpack.dev');

module.exports = {
  host: '0.0.0.0',
  port: 3000,
  open: false,
  dev: {
    stats: config.stats,
  },
};
