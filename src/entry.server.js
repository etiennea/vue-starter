import './core';

import { createApp } from './core';
import { startApp } from './core/start.server';

export default async context => {
  // Create app
  const { app, router, store } = createApp(context);

  // Store init function
  await store.dispatch('httpRequest', app.context);

  // Start application
  return startApp({ app, router, store, context });
};
