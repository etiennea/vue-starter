const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const koaWebpack = require('koa-webpack');
const values = require('lodash/values');
const getConfig = require('../webpack.config');

const clientConfig = getConfig({
  dev: true,
  client: true,
  ssr: true,
});
const serverConfig = getConfig({
  dev: true,
  client: false,
  ssr: true,
});

module.exports = function setupDevServer(app, buildContext, cb) {
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
  clientConfig.entry = values(clientConfig.entry);
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

  // Client compiler
  const mfsClient = new MFS();
  const clientCompiler = webpack(clientConfig);
  clientCompiler.outputFileSystem = mfsClient;

  // Compilation done
  const onClientDone = () => {
    const readFile = file =>
      mfsClient.readFileSync(
        path.join(clientConfig.output.path, file),
        'utf-8',
      );
    clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));

    buildContext.indexHTML = mfsClient.readFileSync(
      path.join(clientConfig.output.path, 'index.ssr.html'),
      'utf-8',
    );

    if (serverBundle) {
      ready(serverBundle, { clientManifest });
    }
  };

  clientCompiler.hooks.done.tap('VueSSRClient', onClientDone);

  // Add middleware to app
  const devMiddleware = koaWebpack({
    compiler: clientCompiler,
    hot: {
      logLevel: 'silent',
    },
    dev: {
      serverSideRender: true,
      publicPath: clientConfig.output.publicPath,
      quite: true,
      noInfo: true,
      stats: false,
      logLevel: 'silent',
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

    const readFile = file =>
      mfs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    serverBundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
    if (clientManifest) {
      ready(serverBundle, { clientManifest });
    }
  });

  return readyPromise;
};
