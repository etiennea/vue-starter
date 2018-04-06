const { sassLoader, cssLoader } = require('./loaders');

const rules = [
  {
    test: /\.css$/,
    use: cssLoader,
  },
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
