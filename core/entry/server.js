import { createApp } from '../app';
import { startApp } from '../utils/server';
import initApp from '~/';

/**
 * Vue start
 */
export default async http => {
  // Create app
  const context = createApp(http);
  context.http = http;

  // Store init function
  await context.store.dispatch('httpRequest', context);

  // Call app init
  await initApp(context);

  // Start application
  return startApp(context);
};
