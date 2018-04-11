<template>
  <div class="main-view">
    <!-- Router View -->
    <router-view
      v-if="!error"
      :key="$route.fullPath"
    />
    <!-- Error Page -->
    <error-page
      v-else
    />
  </div>
</template>

<script>
import { Component, Getter, Vue } from 'vueclass';
import ErrorPage from './ErrorPage';

@Component({
  components: {
    ErrorPage,
  },
})
export default class MainView extends Vue {
  @Getter('error/current') current;

  get error() {
    return this.current ? this.current.error : null;
  }
}
</script>
