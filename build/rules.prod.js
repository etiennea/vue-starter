const ExtractCSS = require('mini-css-extract-plugin');

const rules = [
  {
    test: /\.scss$/,
    use: [
      ExtractCSS.loader,
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true } },
    ],
  },
  {
    test: /\.css$/,
    use: [
      ExtractCSS.loader,
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } },
    ],
  },
  {
    test: /\.woff2?(\?.*)?$/,
    use: {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[hash].[ext]',
      },
    },
  },
];

module.exports = rules;
