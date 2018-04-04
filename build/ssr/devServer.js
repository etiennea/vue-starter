const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const clientConfig = require('./client.dev');
const serverConfig = require('./ssr.dev');
const koaWebpack = require('koa-webpack');

module.exports = function setupDevServer(app, cb) {
  let serverBundle;
  let clientManifest;

  let resolve;
  let resolved = false;
  const readyPromise = new Promise(r => {
    resolve = r;
  });
  const ready = (...args) => {
    if (!resolved) resolve();
    cb(...args);
  };

  // Config for dev middleware
  clientConfig.entry = [clientConfig.entry];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

  serverConfig.entry = [serverConfig.entry];

  // Client compiler
  const mfsClient = new MFS();
  const clientCompiler = webpack(clientConfig);
  clientCompiler.outputFileSystem = mfsClient;

  // Compilation done
  const onClientDone = () => {
    const readFile = file =>
      mfsClient.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));
    if (serverBundle) {
      ready(serverBundle, { clientManifest });
    }
  };

  clientCompiler.hooks.done.tap('VueSSRClient', onClientDone);

  // Add middleware to app
  const devMiddleware = koaWebpack({
    compiler: clientCompiler,
    hot: true,
    dev: {
      serverSideRender: true,
      publicPath: clientConfig.output.publicPath,
      noInfo: true,
      stats: 'none',
    },
  });
  app.use(devMiddleware);

  // Server compiler & watch
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;

    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));

    const readFile = file => mfs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    serverBundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
    if (clientManifest) {
      ready(serverBundle, { clientManifest });
    }
  });

  return readyPromise;
};
