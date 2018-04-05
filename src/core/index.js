// Vue class
import 'reflect-metadata';
import 'vue-class-component';
import 'vue-property-decorator';
import 'vuex-class';
import '~/vueclass';
import '~/vuets';

import Vue from 'vue';
import { createApp } from './app';

// Production tip
Vue.config.productionTip = process.env.NODE_ENV != 'production';

// Include babel runtime in base chunk
// eslint-disable-next-line
const babelFakeAsync = async () => {};

export { createApp };
