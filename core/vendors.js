// Vue class
import 'reflect-metadata';
import 'vue-class-component';
import 'vue-property-decorator';
import 'vuex-class';
import '~/vueclass';
import '~/vuets';

// Polyfills
import 'core-js/fn/object/assign';
import 'core-js/fn/promise';

// Include babel runtime in base chunk
// eslint-disable-next-line
const babelFakeAsync = async () => {};
