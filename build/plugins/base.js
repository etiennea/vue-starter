const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getDefaultBuildOptions, getPath } = require('../utils');

// Env file
const envPath = getPath('.env');
let envData = {};
if (fs.existsSync(envPath)) {
  envData = require('dotenv').parse(fs.readFileSync(envPath));
}
envData.NODE_ENV = process.env.NODE_ENV;

module.exports = (BUILD = getDefaultBuildOptions()) => {
  const buildVars = { BUILD: JSON.stringify(BUILD) };
  buildVars['process.client'] = BUILD.client ? 'true' : 'false';
  buildVars['process.server'] = BUILD.client ? 'false' : 'true';
  buildVars['process.ssr'] = BUILD.ssr ? 'true' : 'false';

  return [
    new webpack.DefinePlugin({
      ...buildVars,
      'process.env': JSON.stringify(envData),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{ from: getPath('assets/static'), to: 'static' }]),
    new webpack.NamedModulesPlugin(),
  ];
};
