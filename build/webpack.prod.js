const { join } = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const workboxPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackCriticalPlugin = require('html-webpack-critical-plugin');

// Project config
const project = require('../project');

const prodConfig = merge(config, {
  devtool: '#source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.woff2?(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new ImageminWebpackPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: join(__dirname, '../tmp/analyzer.html'),
      generateStatsFile: true,
      statsFilename: join(__dirname, '../tmp/stats.json'),
    }),
    new HtmlWebpackCriticalPlugin(),
  ],
});

// PWA Manifest
if (project.manifest) {
  prodConfig.plugins.push(new WebpackPwaManifest(project.manifest));
} else {
  // Preload plugin
  prodConfig.plugins.push(new PreloadWebpackPlugin());
}

// PWA Workbox
if (project.workbox) {
  prodConfig.plugins.push(
    new workboxPlugin.InjectManifest({
      swSrc: join(__dirname, '../src/sw.js'),
      swDest: 'sw.js',
    }),
  );
}

module.exports = prodConfig;
