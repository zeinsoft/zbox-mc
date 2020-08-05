import Vue from 'vue';
import {
  LIST,
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.categories = response.categories;
  },


};
