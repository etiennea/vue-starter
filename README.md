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
* **SSR** support (work in progress)
  * Koa & koa-webpack
  * vuex & meta integration
  * PWA, Workbox & Critical CSS support
* **CLI** with `dev`, `build` and `start` commands
* Accessibility checks with Tota11y

## Description

**TODO**

## Credits

* [Evan You & VueJS core members](https://vuejs.org/)
* [NuxtJS members](https://nuxtjs.org/)
* [@crisbal and his great repo](https://github.com/crisbal/vue-webpack-ssr-fully-featured)

## Todo

* Error page
  * 404/Not found error
  * Error status code
  * Show nice stacktrace in dev
* app/core
  * App.vue (MainView component with RouterView & ErrorPage)
  * ErrorPage.vue
  * loading.html (SPA)
* Example
* Future
  * Yeoman generator
  * Dockerfile
  * SSR
    * Redirect function (wip)
    * Plugins system (wip)
    * Middlewares system
    * Layouts system (?)
  * Webpack
    * extend with in project config
    * better way to manage config

## License

**MIT**: see `LICENSE` file
