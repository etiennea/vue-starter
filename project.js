const path = require('path');

module.exports = {
  /**
   * Head
   */
  head: {
    title: 'Vue App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Description of project' },
    ],
  },

  /**
   * PWA Manifest
   */
  manifest: {
    name: 'Vue App',
    short_name: 'Vue App',
    description: 'Description of project',
    background_color: '#ffffff',
    theme_color: '#333333',
    start_url: '/index.html',
    publicPath: '/',
    display: 'standalone',
    icons: [
      {
        src: path.resolve('assets/icon.png'),
        sizes: [96, 128, 192, 256, 384, 512, 1024],
      },
    ],
    ios: true,
  },

  /**
   * Workbox enable
   */
  workbox: true,

  /**
   * Servers options
   */
  server: {
    dev: {
      port: 3000,
      host: '127.0.0.1',
    },
    prod: {
      port: 3000,
      host: '127.0.0.1',
    },
  },
};
