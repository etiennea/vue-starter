const fs = require('fs');
const { join } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Base paths
const rootPath = join(__dirname, '..');
const srcPath = join(rootPath, 'src');
const assetsPath = join(rootPath, 'assets');
const staticPath = join(rootPath, 'static');

// Loaders
const { babelLoader, tsLoader, vueLoader } = require('./loaders');

// Env file
const envPath = join(rootPath, '.env');
let envData = {};
if (fs.existsSync(envPath)) {
  envData = require('dotenv').parse(fs.readFileSync(envPath));
}
envData.NODE_ENV = process.env.NODE_ENV;

module.exports = {
  context: rootPath,
  entry: {
    app: join(srcPath, 'entry.client.js'),
  },
  output: {
    path: join(rootPath, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
  },
  stats: {
    modules: false,
    colors: true,
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '~': srcPath,
      '~~': rootPath,
      assets: assetsPath,
      static: staticPath,
      vue$: 'vue/dist/vue.runtime.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcPath],
        use: babelLoader,
      },
      {
        test: /\.ts$/,
        include: [srcPath],
        use: tsLoader,
      },
      {
        test: /\.vue$/,
        include: [srcPath],
        use: vueLoader,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash].[ext]',
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.ya?ml$/,
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envData),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{ from: staticPath, to: 'static' }]),
  ],
};
