<template>
  <div class="error-page">
    <h1>Error</h1>
    <div>
      <a
        href="/"
        @click.prevent="gotoHome"
      >
        Go to home
      </a>
    </div>
  </div>
</template>

<script>
import { Component, Getter, Vue } from 'vueclass';

@Component()
export default class ErrorPage extends Vue {
  @Getter('error/current') current;

  gotoHome() {
    this.$store.commit('error/CLEAR');
    if (this.$router.currentRoute.path != '/') {
      this.$router.replace('/');
    }
  }
}
</script>
