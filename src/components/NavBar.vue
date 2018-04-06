<template>
  <div class="nav">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <router-link :to="item.path">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue } from '~/vueclass';
import storeModule from '~/storeModule';

const NavStore = storeModule('nav');

@Component()
export default class NavBar extends Vue {
  @NavStore.State('links') items;
}
</script>
