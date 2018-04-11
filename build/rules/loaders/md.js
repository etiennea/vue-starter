const htmlLoader = require('./html');

const mdLoader = [
  htmlLoader,
  {
    loader: 'markdown-loader',
  },
];

module.exports = mdLoader;
