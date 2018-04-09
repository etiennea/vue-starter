const PwaManifest = require('webpack-pwa-manifest');
const Workbox = require('workbox-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const CssExtract = require('mini-css-extract-plugin');
const Preload = require('preload-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CriticalCSS = require('html-webpack-critical-plugin');
const { getPath, getProject, getDefaultBuildOptions } = require('../utils');

// Project config
const project = getProject();

module.exports = (BUILD = getDefaultBuildOptions()) => {
  if (BUILD.client && !BUILD.dev) {
    const plugins = [
      new Imagemin({
        test: /\.(jpe?g|png|gif|svg)$/i,
      }),
      new CssExtract({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
      }),
      new BundleAnalyzer({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: getPath('.tmp/analyzer.html'),
        generateStatsFile: true,
        statsFilename: getPath('.tmp/stats.json'),
      }),
      new CriticalCSS(),
    ];

    if (project.manifest) {
      // PWA Manifest
      plugins.push(new PwaManifest(project.manifest));
    } else {
      // Preload plugin
      plugins.push(new Preload());
    }

    // PWA Workbox
    if (project.manifest && project.workbox) {
      plugins.push(
        new Workbox.InjectManifest({
          swSrc: getPath('service-worker.js', 'app'),
          swDest: 'service-worker.js',
          templatedUrls: {
            '/': 'index.ssr.html',
            '/index.html': 'index.ssr.html',
          },
        }),
      );
    }

    return plugins;
  }
  return [];
};
