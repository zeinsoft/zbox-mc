import Vue from 'vue';
import store from '@/store';
import UserProxy from "../../../proxies/UserProxy";
import DeptProxy from "../../../proxies/DeptProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  console.log(params);
  new DeptProxy(params)
    .getUsersByDeptCode(params)
    .then((response) => {
      commit(types.LIST, response);
    });
};



export default {
  findAll,
};
