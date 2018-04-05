const webpack = require('webpack');
const mode = process.argv[2] || 'spa';

let compiler;
switch (mode) {
  case 'ssr':
    compiler = webpack([require('./build/ssr/client.prod'), require('./build/ssr/ssr.prod')]);
    break;
  default:
    compiler = webpack(require('./build/webpack.prod'));
    break;
}

compiler.run();
