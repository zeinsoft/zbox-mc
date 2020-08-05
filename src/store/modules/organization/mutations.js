import Vue from 'vue';
import {
  LIST,
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.accounts = response.accounts;
    state.total = response.totalCnt;
  },


};
