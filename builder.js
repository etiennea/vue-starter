/* eslint-disable */

const fs = require('fs-extra');
const webpack = require('webpack');
const baseConfig = require('./build/webpack.base');
const mode = process.argv[2] || 'spa';

// Clean
fs.removeSync(baseConfig.output.path);

// Prepare compiler
let compiler;
switch (mode) {
  case 'ssr':
    compiler = webpack([require('./build/ssr/client.prod'), require('./build/ssr/ssr.prod')]);
    break;
  default:
    compiler = webpack(require('./build/webpack.prod'));
    break;
}

// Run compiler
compiler.run((err, stats) => {
  if (err) return console.error(err);
  console.log(stats.toString(baseConfig.stats));
});
