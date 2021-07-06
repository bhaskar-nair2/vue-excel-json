// import { map, toPairs } from 'lodash';
import Vue from 'vue';
import { nanoid } from 'nanoid';

export default {
  namespaced: true,
  state: {
    rawData: [],
    parsedData: {},
    mappings: {
      'A': {
        title: 'Name',
        formatter: (value) => value,
        validator: () => true,
      },
      'B': {
        title: 'Description',
        formatter: (value) => value,
        validator: () => true,
      },
    },
  },
  mutations: {
    // * List mutations
    SET_RAW_DATA(state, rawData = []) {
      state.rawData = rawData;
    },
    SET_PARSED_DATA(state, parsed = {}) {
      state.parsedData = { ...parsed };
    },
    UPDATE_PARSED_DATA(state, parsed = {}) {
      state.parsedData = { ...state.parsedData, ...parsed };
    },
    REMOVE_PARSED_DATA(state) {
      state.parsedData = {};
    },
    REMOVE_RAW_DATA(state) {
      state.rawData = {};
    },

    // * Individual item mutations
    SET_ITEM_BY_ID(state, { id, value }) {
      Vue.set(state.parsedData, id, value);
    },
    UPDATE_ITEM_BY_ID(state, { id, value }) {
      const item = state.parsedData[id];
      Vue.prototype.$set(state.parsedData, id, { ...item, ...value });
    },
    REMOVE_ITEM_BY_ID(state, id) {
      Vue.prototype.$delete(state.parsedData, id);
    },

    // * Mapping mutations
    SET_MAPPINGS(state, value) {
      state.mappings = value;
    },
    UPDATE_MAPPING(state, { key, value }) {
      Vue.prototype.$set(state.mappings, key, value);
    },
    REMOVE_MAPPING(state, key) {
      Vue.delete(state.mappings, key);
    },
  },
  getters: {
    rawList: (state) => state.rawData,
    parsedList: (state) => Object.values(state.parsedData),
    parsedItemByID: (state) => (id) => state.parsedData[id],
  },
  actions: {
    /**
     * @description Convert raw data to formatted data based
     * on mappings provided
     * @param {Vuex} state
     * @param {Object} options
     * @return {Object} parsedData
     */
    async parseRawData({ state, commit, dispatch }, options) {
      const rawData = state.rawData;
      // ? item formatter is an optional, user-defined
      // ? function which will run on each item
      // TODO: Convert this to an array of functions
      const { postFormatter } = options;


      const parsed = {};

      const pFormatter =
        postFormatter ? postFormatter : (val) => val;


      for (const item of rawData) {
        let ret = await dispatch('itemParser', item);
        // ? Run custom formatters
        ret = pFormatter(ret);
        // ? add item to parsed
        parsed[ret._uid] = ret;
      }

      commit('SET_PARSED_DATA', parsed);
      return parsed;
    },

    itemParser({ state }, item) {
      // ! Move item creation function here
      // ! Move to a itemParser function
      const ret = {}; // Return value
      let flag = true; // Validator Flag
      const errors = [];

      // ? Array of keys to read ['A','B','C']
      const mappings = state.mappings;
      const keys = Object.keys(mappings);

      // ? Create ID
      const id = nanoid();
      ret._uid = id;

      // ? Convert data
      keys.forEach((key) => {
        // ? Get the current mapping => mappings['A']
        const mapVal = mappings[key];
        const {
          title,
          validator = () => true,
          valFormatter = (val) => val,
        } = mapVal;

        // ? Get value => item['A']
        const itemValue = item[key];

        // ? Format value and set to ret value
        ret[title] = valFormatter(itemValue);

        const isValid = validator(itemValue);
        // ? message to show which field is invalid
        if (!isValid) errors.push({ title, key });

        // ? Compute a cumalative flag
        flag = flag && isValid;
      });


      // ? Set validation state
      ret._valid = flag;
      ret._errors = errors;
      return ret;
    },
  },
};
