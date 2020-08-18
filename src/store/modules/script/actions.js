import Vue from 'vue';
import store from '@/store';
import ScriptProxy from "../../../proxies/ScriptProxy";
import * as types from './mutation-types';
import MongoProxy from "../../../proxies/MongoProxy";

export const findAll = ({ commit }, params) => {
  new ScriptProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};


export const create = ({ commit }, param) => {
  new ScriptProxy()
    .create(param)
    .then((response) => {
      console.log(response);
      new MongoProxy()
        .create({
          left_table: "tasks",
          left_uuid: param.taskUUID,
          right_table: "scripts",
          right_uuid: response.rest_input.uuid
        })
        .then((response) => {
          Vue.router.push({
            name: 'TaskList'//'TaskEdit', params: {userId: param.taskUUID}
          });
        })

    }).catch((e) => {
    console.log(e);
    alert(e.detail);
  });
};


export default {
  findAll,
  create,
};
