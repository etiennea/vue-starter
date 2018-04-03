<template>
  <div class="layout default-layout">
    <nav-bar/>
    <slot/>
  </div>
</template>

<script>
import { Component, Vue } from '~/vueclass';
import NavBar from '~/components/NavBar';

@Component({
  components: {
    NavBar,
  },
})
export default class DefaultLayout extends Vue {}
</script>
