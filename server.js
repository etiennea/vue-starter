const fs = require('fs');
const path = require('path');
const compression = require('compression');
const express = require('express');
const app = express();

let port = 5000;
const resolve = file => path.resolve(__dirname, file);
const isProduction = process.env.NODE_ENV === 'production';
const template = fs.readFileSync(resolve('./src/index.ssr.html'), 'utf-8');

const createRenderer = (bundle, options) => {
  return require('vue-server-renderer').createBundleRenderer(
    bundle,
    Object.assign(options, {
      template,
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
      basedir: resolve('./dist'),
      runInNewContext: false,
    }),
  );
};

/**
 * Server static files
 */
const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProduction ? 60 * 60 * 24 * 30 : 0,
  });

let renderer;
let readyPromise;
if (isProduction) {
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest,
  });
  readyPromise = Promise.resolve();
} else {
  port = 3000;
  readyPromise = require('./build/ssr/server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

/**
 * Render page
 */
const render = (req, res, context) => {
  res.setHeader('Content-Type', 'text/html');

  const errorHandler = err => {
    res.status(500);
    res.end(`
      500 | Fatal error: ${err}
      <br>
      <br>
      <pre>${err.stack}</pre>
    `);
  };

  renderer.renderToString(context, (err, html) => {
    if (err) return errorHandler(err);
    res.status(200);
    res.end(html);
  });
};

/**
 * Express middlewares
 */
app.use(compression({ threshold: 0 }));
app.use('/', serve('./dist', true));
app.use('/static', serve('./dist/static', true));

app.get('*', (req, res) => {
  const context = {
    url: req.url,
  };
  isProduction ? render(req, res, context) : readyPromise.then(() => render(req, res, context));
});

let server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
