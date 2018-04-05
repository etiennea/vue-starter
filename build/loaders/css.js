const cssLoader = [
  { loader: 'vue-style-loader' },
  { loader: 'css-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];

module.exports = cssLoader;
