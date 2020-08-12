import Vue from 'vue';
import store from '@/store';
import UserProxy from "../../../proxies/UserProxy";
import DeptProxy from "../../../proxies/DeptProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new DeptProxy()
    .getUsersByDeptCode(params.deptCode)
    .then((response) => {
      commit(types.LIST, response);
    });
};



export default {
  findAll,
};
