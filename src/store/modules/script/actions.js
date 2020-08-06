import Vue from 'vue';
import store from '@/store';
import ScriptProxy from "../../../proxies/ScriptProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new ScriptProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};



export default {
  findAll,
};
