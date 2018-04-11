<template>
  <div class="error-page">
    <h1>Error {{ code }}</h1>
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
import { Component, Getter, Prop, Vue } from 'vueclass';

@Component()
export default class ErrorPage extends Vue {
  @Getter('error/current') current;
  @Prop({ type: Number })
  statusCode;

  gotoHome() {
    this.$store.commit('error/CLEAR');
    if (this.$router.currentRoute.path != '/') {
      this.$router.replace('/');
    }
  }

  get code() {
    return this.statusCode || this.current.statusCode || 500;
  }
}
</script>
