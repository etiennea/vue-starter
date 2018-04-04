const { resolve } = require('path');
const { readFileSync } = require('fs');
const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const serve = require('koa-static');

const port = 3000;
const app = new Koa();
const isProd = process.env.NODE_ENV === 'production';
const template = readFileSync(resolve('./src/index.ssr.html'), 'utf-8');

/**
 * SSR
 */
const createRenderer = (bundle, options) => {
  options = Object.assign(options, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    basedir: resolve('.'),
    runInNewContext: false,
  });
  return require('vue-server-renderer').createBundleRenderer(bundle, options);
};

let renderer;
let readyPromise;
if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest,
  });
  readyPromise = Promise.resolve();
} else {
  readyPromise = require('./build/ssr/devServer')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

/**
 * Render page
 */
const renderRoute = (ctx, context) => {
  return new Promise(resolve => {
    ctx.set('content-type', 'text/html');

    const errorHandler = err => {
      ctx.response.status = 500;
      ctx.response.body = `
        500 | Fatal error: ${err}
        <br>
        <br>
        <pre>${err.stack}</pre>
      `;
    };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        errorHandler(err);
        return resolve();
      }
      ctx.response.status = 200;
      ctx.response.body = html;
      resolve();
    });
  });
};

/**
 * Server
 */
if (isProd) {
  app.use(compress());
  app.use(mount('/', serve('./dist')));
  app.use(mount('/static', serve('./dist/static')));
}

app.use(async ctx => {
  const { url } = ctx;
  const context = { url };

  if (isProd) {
    await renderRoute(ctx, context);
  } else {
    return readyPromise.then(() => renderRoute(ctx, context));
  }
});

const instance = app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = {
  ready: readyPromise,
  close: () => {
    instance.close();
  },
};
