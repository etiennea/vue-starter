const { join } = require('path');
const projectConfig = require('../project');
const paths = require('./paths');

const getProject = () => {
  return Object.assign(
    {
      server: {
        dev: { port: 3000, host: '127.0.0.1' },
        prod: { port: 3000, host: '127.0.0.1' },
      },
    },
    projectConfig,
  );
};

const getPath = (filepath = '', dir = 'root') => {
  return join(paths[dir], filepath);
};

const getServerOptions = (dev = true) => {
  return getProject().server[dev ? 'dev' : 'prod'];
};

const getDefaultBuildOptions = () => {
  return {
    client: true,
    dev: true,
    ssr: false,
  };
};

module.exports = {
  getDefaultBuildOptions,
  getProject,
  getPath,
  getServerOptions,
};
