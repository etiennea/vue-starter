const { getPath } = require('../../utils');

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: getPath('.tmp/cache-loader'),
  },
};

module.exports = cacheLoader;
