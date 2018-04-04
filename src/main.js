/**
 * Hot Module Replacement
 */
if (process.env.NODE_ENV === 'development') {
  if (module.hot) module.hot.accept();
}

// Styles
import '~~/scss/index.scss';

// Init app
import { createApp } from './core/app';
const { app, router } = createApp();

// Import shared component to be bundled in main chunk
import './layouts/DefaultLayout';
import './components/NavBar';

/**
 * Router ready & mounting app
 */
router.onReady(() => {
  app.$mount('#app');
});
