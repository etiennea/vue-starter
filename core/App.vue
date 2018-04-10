<template>
  <div id="app">
    <router-view
      v-if="!current || !current.error"
      :key="$route.fullPath"
    />
    <error-page
      v-else
    />
  </div>
</template>

<script>
import { Component, Getter, Vue } from 'vueclass';
import ErrorPage from './Error';

@Component({
  components: {
    ErrorPage,
  },
})
export default class App extends Vue {
  @Getter('error/current') current;
}
</script>
