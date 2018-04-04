const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const serverConfig = merge(config, {
  target: 'node',
  stats: 'none',
  entry: join(__dirname, '../../src/main.ssr.js'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: Object.keys(require('../../package.json').dependencies),
  plugins: [
    new WebpackBar({
      name: 'SSR: Server',
      color: 'orange',
    }),
    new webpack.DefinePlugin({
      'process.ssr': 'true',
      'process.server': 'true',
    }),
    new VueSSRServerPlugin(),
  ],
});

module.exports = serverConfig;
