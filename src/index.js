// import { processFile } from '@/helpers/xlWorker.js';
import excelStore from './vuex/store';

export default {
  install(Vue, options = {}) {
    const { store, mappings, startsFrom } = options;

    if (!store) {
      throw new Error('vue-excel-upload needs Vuex store to work');
    }
    store.registerModule('excelStore', excelStore);

    // Vue.prototype.$excel = {
    //   processSheet: processFile,
    // };
  },

};
