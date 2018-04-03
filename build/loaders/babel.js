const cacheLoader = require('./cache');

const babelLoader = [
  cacheLoader,
  {
    loader: 'babel-loader',
    // options: {
    //   presets: ['@babel/preset-env'],
    //   plugins: ['@babel/plugin-transform-runtime'],
    // },
  },
];

module.exports = babelLoader;
