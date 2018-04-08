const ExtractCSS = require('mini-css-extract-plugin');

module.exports = (BUILD, type) => {
  let loaders = [];

  if (BUILD.dev || !BUILD.client) loaders.push({ loader: 'vue-style-loader' });
  else loaders.push(ExtractCSS.loader);

  loaders = [
    ...loaders,
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
  ];

  if (type === 'sass') {
    loaders.push({ loader: 'sass-loader', options: { sourceMap: true } });
  }

  return loaders;
};
