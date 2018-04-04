const { sassLoader } = require('./loaders');

const rules = [
  {
    test: /\.scss$/,
    use: sassLoader,
  },
  {
    test: /\.woff2?(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        mimetype: 'application/font-woff',
      },
    },
  },
];

module.exports = rules;
