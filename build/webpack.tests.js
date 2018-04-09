const merge = require('webpack-merge');
const getConfig = require('./webpack.config');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(getConfig(), {
  devtool: 'inline-cheap-module-source-map',
  externals: [nodeExternals()],
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
});
