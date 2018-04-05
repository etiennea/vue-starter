const cssLoader = require('./css');

const sassLoader = [...cssLoader, { loader: 'sass-loader', options: { sourceMap: true } }];

module.exports = sassLoader;
