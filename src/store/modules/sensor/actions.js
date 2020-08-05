import Vue from 'vue';
import store from '@/store';
import SensorsProxy from "../../../proxies/SensorsProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new SensorsProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export default {
  findAll,
};
