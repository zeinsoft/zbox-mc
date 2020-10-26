import Vue from 'vue';
import {
  LIST,
  SCRIPT_LIST,
  RESET_SCRIPT_LIST
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.tasks = response.result_obj;
  },

  [SCRIPT_LIST](state, response) {
    state.scripts = response.result_obj;
  },

  [RESET_SCRIPT_LIST](state) {
    state.scripts = [];
  }


};
