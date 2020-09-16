import Vue from 'vue';
import store from '@/store';
import TaskProxy from "../../../proxies/TaskProxy";
import * as types from './mutation-types';
import MongoProxy from "@/proxies/MongoProxy";

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
      new MongoProxy()
        .create({
          left_table: "tasks",
          left_uuid: response.rest_input.uuid,
          right_table: "prods",
          right_uuid: param.prodUUid
        })
        .then((response) => {
          Vue.router.push({
            name: 'TaskList'
          });
        })


    }).catch((e) => {
      console.log(e);
      alert(e.detail);
    });
};

/**
 * Task에 포함된 script 리스트
 * @param commit
 * @param uuid
 */
export const getScriptByTargetUUID = ({ commit }, uuid) => {
  new TaskProxy()
    .getScriptByTargetUUID(uuid)
    .then((response) => {
      commit(types.SCRIPT_LIST, response);
    });
};


export default {
  findAll,
  create,
  getScriptByTargetUUID,
};
