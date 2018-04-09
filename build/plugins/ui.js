const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const { getServerOptions, getDefaultBuildOptions } = require('../utils');

module.exports = (BUILD = getDefaultBuildOptions()) => {
  const { ssr, dev, client } = BUILD;
  const { host, port } = getServerOptions(dev);

  let barTitle = dev ? 'SPA: development' : 'SPA: production';
  let barColor = client ? 'green' : 'orange';
  let successMessage = `Server running: http://${host}:${port}`;

  if (!ssr && !dev) {
    successMessage = false;
  } else if (ssr) {
    if (dev) {
      barTitle = client ? 'SSR/Client: development' : 'SSR/Server: development';
    } else {
      barTitle = client ? 'SSR/Client: production' : 'SSR/Server: production';
      successMessage = false;
    }
  }

  let friendlyErrorsOptions = null;
  if (successMessage) {
    friendlyErrorsOptions = {
      compilationSuccessInfo: {
        messages: [successMessage],
      },
    };
  }

  const plugins = [
    new WebpackBar({
      name: barTitle,
      color: barColor,
    }),
  ];

  if (successMessage) {
    plugins.push(new FriendlyErrors(friendlyErrorsOptions));
  }

  return plugins;
};
