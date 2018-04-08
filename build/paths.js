const { join } = require('path');
const root = join(__dirname, '..');
const core = join(root, 'core');
const app = join(root, 'app');
const dist = join(root, 'dist');

module.exports = {
  root,
  core,
  app,
  dist,
};
