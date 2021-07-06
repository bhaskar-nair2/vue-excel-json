// import Vue from 'vue';
import { excelToJson } from './helpers/xlWorker.js';
import excelStore from './vuex/store';

/**
 *
 */
export default class VueExcel {
  /**
   *
   * @param {VuexStore} store
   */
  constructor({ store }) {
    if (!store) {
      throw new Error('vue-excel-upload needs Vuex store to work');
    } else if (!store.hasModule('excelStore')) {
      store.registerModule('excelStore', excelStore);
    }

    // ? Store is read as a singleton,
    this.store = store;
  }

  // * File Functions
  /**
   * @description Function to take a file and convert it to JSON for
   * further processing
   * @param {File} file
   * @param {number} startRow Absolute number from where you wish to
   * start reading the doc (no 0 index)
   */
  async processFile(file, { startRow = 0 } = {}) {
    try {
      // ? Convert Excel to raw data
      const rawData = await excelToJson(file, startRow);
      // ? Save raw data in store
      this.store.commit('excelStore/SET_RAW_DATA', rawData);
    } catch (error) {
      // console.error(error);
      throw new Error('Error in processing file');
    }
  }

  // * Data functions
  /**
   * @description Function to parse raw data to formatted data based
   * on mappings and helper functions
   * @param {Object} options various options for formatting data
   */
  async parseRawData(options = {}) {
    try {
      return await this.store.dispatch('excelStore/parseRawData', options);
    } catch (error) {
      // console.error(error);
      throw new Error('Error in processing raw data');
    }
  }

  // * VueX functions
  /**
   *
   * @param {Object} mappings
   */
  setMapping(mappings) {
    this.store.commit('excelStore/SET_MAPPINGS', mappings);
  }
}
