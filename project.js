const path = require('path');

module.exports = {
  /**
   * PWA Manifest
   */
  manifest: {
    name: 'Vue App',
    short_name: 'Vue App',
    description: 'Description of project',
    background_color: '#ffffff',
    theme_color: '#333333',
    start_url: '/',
    publicPath: '/',
    display: 'standalone',
    icons: [
      {
        src: path.resolve('assets/icon.png'),
        sizes: [96, 128, 192, 256, 384, 512, 1024],
        destination: 'icons',
      },
    ],
    ios: true,
  },

  /**
   * Workbox enable
   */
  workbox: true,
};
