const path = require('path');

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(__dirname, '../../tmp/cache'),
  },
};

module.exports = cacheLoader;
