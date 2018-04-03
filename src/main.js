/**
 * Hot Module Replacement
 */
if (process.env.NODE_ENV === 'development') {
  if (module.hot) module.hot.accept();
}

// Styles
import '~~/scss/index.scss';

// Init core
import './core';

// Import shared component to be bundled in main chunk
import './layouts/DefaultLayout';
import './components/NavBar';
