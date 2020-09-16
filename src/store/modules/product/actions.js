import Vue from 'vue';
import store from '@/store';
import ProductProxy from "../../../proxies/ProductProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new ProductProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};


export default {
  findAll,
};
