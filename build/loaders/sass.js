const sassLoader = [
  { loader: 'vue-style-loader' },
  { loader: 'css-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
  { loader: 'sass-loader', options: { sourceMap: true } },
];

module.exports = sassLoader;
