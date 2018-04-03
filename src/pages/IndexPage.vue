<template>
  <default-layout>
    <div class="page index-page">
      <h1>{{ $t('global.welcome') }}</h1>
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
    title: 'Home',
  },
})
export default class IndexPage extends Vue {}
</script>
