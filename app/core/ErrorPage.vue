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
    <pre v-if="error">{{ error }}</pre>
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

  get error() {
    if (process.dev && this.current.error) {
      return this.current.error.stack || this.current.error;
    }
    return null;
  }

  get code() {
    return this.statusCode || this.current.statusCode || 500;
  }
}
</script>
