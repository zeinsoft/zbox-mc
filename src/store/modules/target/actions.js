import Vue from 'vue';
import store from '@/store';
import TargetProxy from "../../../proxies/TargetProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new TargetProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export const create = ({ commit }, param) => {
  new TargetProxy()
    .create(param)
    .then((response) => {
      Vue.router.push({
        name: 'TargetList'
      });
    });
};

export default {
  findAll,
  create,
};
