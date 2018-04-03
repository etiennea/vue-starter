const merge = require('webpack-merge');
const config = require('./webpack.base');
const { sassLoader } = require('./loaders');

module.exports = merge(config, {
  module: {
    rules: [
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
    ],
  },
});
