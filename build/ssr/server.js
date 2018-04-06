const { join } = require('path');
const { readFileSync } = require('fs-extra');
const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const serve = require('koa-static');
const project = require('../../project');

const buildContext = {};
const app = new Koa();
const isProd = process.env.NODE_ENV === 'production';

const rootPath = join(__dirname, '../..');

let serverConfig;
if (isProd) {
  serverConfig = project.server.prod;
} else {
  serverConfig = project.server.dev;
}
const { host, port } = serverConfig;

/**
 * SSR
 */
const createRenderer = (bundle, options) => {
  options = Object.assign(options, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    basedir: rootPath,
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
  readyPromise = require('./devServer')(
    app,
    buildContext,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    },
  );
}

/**
 * HTML builder
 */
const htmlBuilder = async (context, html) => {
  const template = buildContext.indexHTML;

  // Metas
  const bodyOpt = { body: true };
  const {
    title,
    htmlAttrs,
    bodyAttrs,
    link,
    style,
    script,
    noscript,
    meta,
  } = context.meta.inject();

  const head =
    meta.text() +
    title.text() +
    link.text() +
    style.text() +
    script.text() +
    noscript.text();

  const body = html + script.text(bodyOpt) + context.renderState();

  let result = template
    .replace(/data-html-attrs(="")?/, htmlAttrs.text())
    .replace(/data-body-attrs(="")?/, bodyAttrs.text())
    .replace('<!--head-->', head)
    .replace('<!--body-->', body);

  return result;
};

// In production mode get index.ssr.html file content
if (isProd) {
  buildContext.indexHTML = readFileSync('./dist/index.ssr.html', 'utf-8');
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

    renderer.renderToString(context, async (err, html) => {
      if (err) {
        errorHandler(err);
        return resolve();
      }
      ctx.response.status = 200;
      ctx.response.body = await htmlBuilder(context, html);
      resolve();
    });
  });
};

/**
 * Server
 */
if (isProd) {
  app.use(compress());
  app.use(mount('/', serve(join(rootPath, 'dist'))));
}

app.use(async ctx => {
  const { url } = ctx;
  const context = { url, ctx };

  if (isProd) {
    await renderRoute(ctx, context);
  } else {
    return readyPromise.then(() => renderRoute(ctx, context));
  }
});

const instance = app.listen(port, host, () => {
  // eslint-disable-next-line
  console.log(`Server started at http://${host}:${port}`);
});

module.exports = {
  ready: readyPromise,
  close: () => {
    instance.close();
  },
};
