const HtmlPlugin = require('html-webpack-plugin');
const { getDefaultBuildOptions, getPath } = require('../utils');

module.exports = (BUILD = getDefaultBuildOptions()) => {
  let template = getPath('index.spa.html', 'core');
  let filename = 'index.html';

  if (BUILD.ssr) {
    template = getPath('index.ssr.html', 'core');
    filename = 'index.ssr.html';
  }

  return [
    new HtmlPlugin({
      template,
      filename,
    }),
  ];
};
