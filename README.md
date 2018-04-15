# Vue starter

> Personnal Vue starter

## Features

* **Webpack 4**
* Vue class component with **Babel 7** or **TypeScript**
* **Sass** enabled by default
* **PWA & Workbox** plugins
* Vue plugins
  * vue-router
  * vuex
  * vue-i18n
  * vue-meta
  * vuelidate
* Webpack plugins
  * PostCSS with Autoprefixer & CSSNext
  * Imagemin
  * **Critical CSS**
  * Dotenv integration
* Units tests with **Mocha & @vue/test-utils**
* E2E tests with **Cypress**
* **Linters** (ESLint & Stylelint) and **Prettier**
* **SSR** support
  * Koa & koa-webpack
  * vuex & meta integration
  * PWA, Workbox & Critical CSS support
  * Inject component data with `asyncData()` method
* **CLI** with `dev`, `build` and `start` commands
* Accessibility checks with Tota11y
* **Errors** dedicated page

## Why ? [Nuxt](https://nuxtjs.org/) exists !

Yeah, Nuxt is great, unit and battle-tested. I've done this project only for my needs and
to understand: how Vue works, server-side rendering and Webpack better. In the end,
I think Nuxt is a bit too much opinionated and some files are not overwritable,
but it's just a matter of taste !

So, if you want a production-ready tool, use Nuxt. If you want to learn / see how
server-side rendering works in Vue take a look at the source code !

## Getting started

**Start development server:**

```sh
npm run dev # SPA mode
npm run dev -- --ssr # SSR mode
```

**Build production:**

```sh
npm run build #SPA mode
npm run build -- --ssr # SSR mode
```

**Start production server:**

```sh
npm start #SPA mode
npm start -- --ssr # SSR mode
```

## Description

### Folders & files structure

* `/app` : Contains all your application components and logic
* `/app/core` : Contains needed files by core to run, but you can customize some elements for your app
* `/assets` : For your SCSS files, images and fonts
* `/build` : Webpack configuration, development and production servers
* `/core` : Base files for Vue initialization, for advanced customizations
* `/static` : Will be copied to `/dist` folder directly
* `/tests` : Units & E2E tests files
* `/project.js` : Base configuration for your project

**More to come...**

* Vue class component
* Store module helper
* Initialization function
* PWA & Workbox
* Route loading & transitions

## Credits

* [Evan You & VueJS core members](https://vuejs.org/)
* [NuxtJS members](https://nuxtjs.org/)
* [@crisbal and his great repo](https://github.com/crisbal/vue-webpack-ssr-fully-featured)

## Todo / WIP / Future

* Scaffold / generator / Vue CLI ?
* Dockerfile
* Error page: nice stacktrace
* SSR
  * Vue directives management: https://ssr.vuejs.org/en/api.html#directives
  * How manage JS libs without SSR support
  * Redirect function (wip)
  * Plugins system (wip)
  * Middlewares system
  * Layouts system (?)
* Webpack
  * extend with in project config
  * better way to manage config

## License

**MIT**: see `LICENSE` file
