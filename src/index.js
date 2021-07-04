// import Vue from 'vue';
import { processFile } from './helpers/xlWorker.js';
import excelStore from './vuex/store';

export default {
  // install(Vue, options = {}) {
  //   const { store } = options;

  // if (!store) {
  //   throw new Error('vue-excel-upload needs Vuex store to work');
  // }
  // store.registerModule('excelStore', excelStore);

  // Vue.prototype.$excel = {
  //   processSheet: processFile,
  // };
  // },
  init(store) {
    if (!store) {
      throw new Error('vue-excel-upload needs Vuex store to work');
    } else if (!store.hasModule('excelStore')) {
      store.registerModule('excelStore', excelStore);
    }
  },

  processFile,

};
