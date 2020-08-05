import Vue from 'vue';
import store from '@/store';
import UserProxy from "../../../proxies/UserProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new UserProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};



export default {
  findAll,
};
