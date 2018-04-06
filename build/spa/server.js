const { join } = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const serve = require('koa-static');
const project = require('../../project');

const { host, port } = project.server.prod;

const rootPath = join(__dirname, '../..');

const app = new Koa();
app.use(compress());
app.use(mount('/', serve(join(rootPath, 'dist'))));

const instance = app.listen(port, host, () => {
  // eslint-disable-next-line
  console.log(`Server started at http://${host}:${port}`);
});

module.exports = {
  close: () => {
    instance.close();
  },
};
