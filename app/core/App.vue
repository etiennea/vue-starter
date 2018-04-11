<template>
  <div id="app">
    <main-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vueclass';
import MainView from './MainView';
import baseHead from '~~/project.head';

@Component({
  components: {
    MainView,
  },
  head: baseHead || {},
})
export default class App extends Vue {}
</script>
