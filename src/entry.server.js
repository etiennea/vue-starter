import './core';

import { createApp } from './core';
import { startApp } from './core/start.server';

export default async ssrContext => {
  // Create app
  const context = createApp(ssrContext);
  context.ssrContext = ssrContext;

  // Store init function
  await context.store.dispatch('httpRequest', context);

  // Start application
  return startApp(context);
};
