<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Vue App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Description of project' },
    ],
  },
};
</script>
