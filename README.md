# Vue starter

> Personnal Vue starter

## Features

* Webpack 4
* Vue class component with Babel 7 or TypeScript
* Sass enabled by default
* PWA & Workbox plugins
* Vue plugins
  * vue-i18n
  * vue-meta
  * vuelidate
* Webpack plugins
  * PostCSS with Autoprefixer & CSSNext
  * Imagemin
  * Critical CSS
  * Dotenv integration
* Units tests with Mocha & @vue/test-utils
* E2E tests with Cypress
* Linters (ESLint & Stylelint) and Prettier
* SSR support (work in progress)
  * Koa & koa-webpack
  * vuex & meta integration
  * PWA, Workbox & Critical CSS

## Todo

* Add polyfills for IE
* CLI
  * Clean dist files
  * dev
  * build
  * start
* SSR
  * asyncData with component data
  * redirect() to app.context on server side
  * Future
    * Middlewares system
    * Error page
    * Layouts systems
  * Change project servers configs variables
* Webpack chain / Better & cleaning config

## Credits

* [Evan You & VueJS core members](https://vuejs.org/)
* [NuxtJS members](https://nuxtjs.org/)
* [@crisbal and his great repo](https://github.com/crisbal/vue-webpack-ssr-fully-featured)

## License

**MIT**: see `LICENSE` file
