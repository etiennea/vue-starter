import Vue from 'vue';
import Component from 'vue-class-component';

export { Vue, Component };
export * from 'vue-property-decorator';
export * from 'vuex-class';

// @TODO: mixins
// @TODO: router hooks

Component.registerHooks(['asyncData', 'head']);
