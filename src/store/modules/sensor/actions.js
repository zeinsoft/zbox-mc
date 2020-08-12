import Vue from 'vue';
import store from '@/store';
import SensorsProxy from "../../../proxies/SensorsProxy";
import UsersProxy from "../../../proxies/UserProxy"
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new UsersProxy()
    .getSensorsByUserId(params.userId)
    .then((response) => {
      commit(types.LIST, response);
    });
};

export default {
  findAll,
};
