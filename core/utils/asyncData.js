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
  let { router, http } = context;
  let value = null;

  if (!http) http = {};

  if (component.options.asyncData) {
    value = await component.options.asyncData({
      ...context,
      route: router.currentRoute,
    });
    component.__DATA__ = value;
  }

  return value;
};

export const resolveComponents = (route, components, context) => {
  return Promise.all(
    components.map(component => {
      if (component.options.asyncData) {
        return getComponentAsyncData(component, {
          ...context,
          route,
        }).then(data => {
          if (data) applyAsyncData(component, data);
          return data;
        });
      }
    }),
  );
};
