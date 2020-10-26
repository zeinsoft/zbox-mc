import Vue from 'vue';
import store from '@/store';
import OsVersionProxy from "../../../proxies/OSVersionProxy"
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new OsVersionProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};


export default {
  findAll,
};
