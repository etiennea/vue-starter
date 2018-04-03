const merge = require('webpack-merge');
const config = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(config, {
  devtool: 'inline-cheap-module-source-map',
  externals: [nodeExternals()],
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
});
