import Vue from 'vue';
import {
  LIST,
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.tasks = response.result_obj;
    // state.total = response.totalCnt;
  },


};
