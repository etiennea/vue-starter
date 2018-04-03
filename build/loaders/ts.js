const cacheLoader = require('./cache');

const tsLoader = [
  cacheLoader,
  {
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
    },
  },
];

module.exports = tsLoader;
