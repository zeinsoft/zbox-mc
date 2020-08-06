import Vue from 'vue';
import store from '@/store';
import PlayBookProxy from "../../../proxies/PlayBookProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new PlayBookProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export const edit = ({ commit }, param) => {
  new PlayBookProxy()
    .update(param.uuid, param)
    .then((response) => {
      if(response.header.returnCode === "OK") {
        Vue.router.push({
          name: 'User'
        });
      } else {
        alert(response.header.resultMessages);
      }

    })
    .catch(() => {
      console.log('Request failed...');
    });
};

export const create = ({ commit }, param) => {
  new PlayBookProxy()
    .create(param)
    .then((response) => {
      if(response.header.returnCode === "OK") {
        Vue.router.push({
          name: 'User'
        });
      } else {
        alert(response.header.resultMessages);
      }
    });
};


export default {
  findAll,
};
