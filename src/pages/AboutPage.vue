<template>
  <default-layout>
    <div class="page about-page">
      <h1>About Page</h1>
    </div>
  </default-layout>
</template>

<script>
import { Component, Vue } from '~/vueclass';
import DefaultLayout from '~/layouts/DefaultLayout';

@Component({
  components: {
    DefaultLayout,
  },
  head: {
    title: 'About',
  },
})
export default class AboutPage extends Vue {}
</script>
