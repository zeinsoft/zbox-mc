import Vue from 'vue';
import {
  LIST, PLAY_BOOK_RESULT_LIST,
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.total = response.result_total_count;
    state.playbooks = response.result_obj;
  },

  [PLAY_BOOK_RESULT_LIST](state, response) {
    state.playbook_results = response.result_obj;
  },


};
