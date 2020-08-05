import Vue from 'vue';
import store from '@/store';
import AdminProxy from "../../../proxies/AdminProxy";
import * as types from './mutation-types';

export const findAll = ({ commit }, params) => {
  new AdminProxy(params)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

/**
 * 게정 생성
 * @param commit
 * @param param
 */
export const createUser = ({ commit }, param) => {
  new AdminProxy()
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

/**
 * 계정 수정
 * @param commit
 * @param param
 */
export const editUser = ({ commit }, param) => {
  new AdminProxy()
    .update(param.adminId, param)
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


export default {
  findAll,
  createUser,
  editUser,
};
