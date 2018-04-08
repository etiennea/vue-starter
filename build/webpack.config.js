const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');
const getRules = require('./rules');
const { getPath, getDefaultBuildOptions } = require('./utils');

module.exports = (BUILD = getDefaultBuildOptions()) => {
  const config = {
    context: getPath('.'),
    entry: { app: getPath('entry/client.js', 'core') },
    output: {
      path: getPath('dist'),
      filename: 'js/[name].[hash].js',
      publicPath: '/',
    },
    stats: { modules: false, colors: true },
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    resolve: {
      extensions: ['.js', '.ts', '.vue'],
      alias: require('./aliases'),
    },
    module: {
      rules: getRules(BUILD),
    },
    plugins: [
      ...require('./plugins/base')(BUILD),
      ...require('./plugins/ui')(BUILD),
      ...require('./plugins/html')(BUILD),
      ...require('./plugins/prod')(BUILD),
    ],
  };

  /**
   * Production
   */
  if (!BUILD.dev) {
    config.mode = 'production';
    config.devtool = '#source-map';

    /**
     * Chunks split
     */
    if (BUILD.client) {
      config.optimization = {
        splitChunks: {
          chunks: 'all',
        },
      };
    }
  }

  /**
   * SSR plugins
   */
  if (BUILD.ssr) {
    // Client side
    if (BUILD.client) {
      config.plugins.push(new VueSSRClientPlugin());

      // Server side
    } else {
      config.target = 'node';
      config.entry = getPath('entry/server', 'core');
      config.output = {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
      };
      config.externals = [nodeExternals()];
      config.plugins.push(new VueSSRServerPlugin());
    }
  }

  return config;
};
