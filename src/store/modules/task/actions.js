import Vue from 'vue';
import store from '@/store';
import TaskProxy from "../../../proxies/TaskProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new TaskProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export const edit = ({ commit }, param) => {
  new TaskProxy()
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
  new TaskProxy()
    .create(param)
    .then((response) => {
      Vue.router.push({
        name: 'TaskList'
      });
    }).catch((e) => {
      console.log(e);
      alert(e.detail);
    });
};


export default {
  findAll,
  create,
};
