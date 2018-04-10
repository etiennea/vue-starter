const noopData = () => ({});

export function applyAsyncData(component, asyncData) {
  const ComponentData = component.options.data || noopData;

  if (!asyncData && component.options.hasAsyncData) {
    return;
  }

  component.options.hasAsyncData = true;
  component.options.data = function() {
    const data = ComponentData.call(this);
    return { ...data, ...asyncData };
  };

  if (component.extendOptions) {
    component.extendOptions.__DATA__ = asyncData;
  }
}

export const getComponentAsyncData = async (component, context) => {
  let { http } = context;
  let value = null;

  if (!http) http = {};

  if (component.options.asyncData) {
    value = await component.options.asyncData({
      ...context,
    });
    component.__DATA__ = value;
  }

  return value;
};

export const resolveComponentsAsyncData = (route, components, context) => {
  return Promise.all(
    components.map(component => {
      if (component.options.asyncData) {
        return getComponentAsyncData(component, {
          ...context,
          route,
          params: route.params,
        }).then(data => {
          if (data) applyAsyncData(component, data);
          return data;
        });
      }
    }),
  );
};

const onHotReload = callback => {
  if (process.client && module.hot) {
    module.hot.addStatusHandler(status => {
      if (status === 'idle') callback();
    });
  }
};

export const handleHMRAsyncData = (router, context) => {
  onHotReload(() => {
    const route = router.currentRoute;
    const matched = router.getMatchedComponents();

    // Get data
    resolveComponentsAsyncData(route, matched, context).then(datas => {
      // Get instances with asyncData
      const instances = [];
      for (const match of router.currentRoute.matched) {
        if (match.components.default.extendOptions.asyncData) {
          instances.push(match.instances.default);
        }
      }

      // Set data on components
      for (const index in datas) {
        const data = datas[index];
        const instance = instances[index];
        Object.assign(instance.$data, data);
      }
    });
  });
};
