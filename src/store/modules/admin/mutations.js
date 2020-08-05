import Vue from 'vue';
import {
  LIST,
} from './mutation-types';

export default {

  [LIST](state, response) {
    state.admins = response.admins;
  },


};
