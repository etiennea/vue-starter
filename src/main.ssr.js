import './core';
import { createApp } from './core/app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context);

    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      Promise.all(
        matchedComponents.map(component => {
          return (
            component.asyncData &&
            component.asyncData({
              ...context,
              app,
              store,
              route: router.currentRoute,
            })
          );
        }),
      )
        .then(() => {
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
