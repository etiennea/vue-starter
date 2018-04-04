const { join } = require('path');
const PwaManifest = require('webpack-pwa-manifest');
const Workbox = require('workbox-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const CssExtract = require('mini-css-extract-plugin');
const Preload = require('preload-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Project config
const project = require('../project');

const plugins = [
  new Imagemin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  new CssExtract({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].[hash].css',
  }),
  new BundleAnalyzer({
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: join(__dirname, '../tmp/analyzer.html'),
    generateStatsFile: true,
    statsFilename: join(__dirname, '../tmp/stats.json'),
  }),
];

if (project.manifest) {
  // PWA Manifest
  plugins.push(new PwaManifest(project.manifest));
} else {
  // Preload plugin
  plugins.push(new Preload());
}

// PWA Workbox
if (project.workbox) {
  plugins.push(
    new Workbox.InjectManifest({
      swSrc: join(__dirname, '../src/sw.js'),
      swDest: 'sw.js',
    }),
  );
}

module.exports = plugins;
