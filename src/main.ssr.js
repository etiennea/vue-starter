import './core';

import { createApp } from './core';
import { startApp } from './core/start.server';

export default context => {
  // Create app
  const { app, router, store } = createApp(context);

  // Start application
  return startApp({ app, router, store, context });
};
