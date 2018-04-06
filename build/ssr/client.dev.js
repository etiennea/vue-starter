const { join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../webpack.base');
const WebpackBar = require('webpackbar');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

const project = require('../../project');
const { host, port } = project.server.dev;

// Base paths
const rootPath = join(__dirname, '../..');
const srcPath = join(rootPath, 'src');

module.exports = merge(config, {
  module: {
    rules: [...require('../rules.dev')],
  },
  plugins: [
    new WebpackBar({
      name: 'SSR: Client',
    }),
    new FriendlyErrors({
      compilationSuccessInfo: {
        messages: [`[Client] Server running: http://${host}:${port}`],
      },
    }),
    new HtmlPlugin({
      template: join(srcPath, 'index.ssr.html'),
      filename: 'index.ssr.html',
    }),
    new webpack.DefinePlugin({
      'process.ssr': 'true',
      'process.client': 'true',
    }),
    new VueSSRClientPlugin(),
  ],
});
