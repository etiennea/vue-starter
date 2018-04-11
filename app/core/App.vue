<template>
  <div id="app">
    <main-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vueclass';
import MainView from './MainView';

@Component({
  components: {
    MainView,
  },
})
export default class App extends Vue {}
</script>
