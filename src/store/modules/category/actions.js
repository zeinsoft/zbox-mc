import Vue from 'vue';
import store from '@/store';
import CategoryProxy from '@/proxies/CategoryProxy';
import * as types from './mutation-types';

export const findAll = ({ commit }) => {
  new CategoryProxy()
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export default {
  findAll,
};
