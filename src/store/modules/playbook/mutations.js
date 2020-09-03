import Vue from 'vue';
import {
  LIST, PLAY_BOOK_RESULT_LIST,
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.playbooks = response.result_obj;
  },

  [PLAY_BOOK_RESULT_LIST](state, response) {
    state.playbook_results = response.result_obj;
  },


};
