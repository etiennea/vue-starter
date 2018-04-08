const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const serve = require('koa-static');
const { getServerOptions, getPath } = require('../utils');

const { host, port } = getServerOptions(false);

const app = new Koa();
app.use(compress());
app.use(mount('/', serve(getPath('', 'dist'))));

const instance = app.listen(port, host, () => {
  // eslint-disable-next-line
  console.log(`Server started at http://${host}:${port}`);
});

module.exports = {
  close: () => {
    instance.close();
  },
};
