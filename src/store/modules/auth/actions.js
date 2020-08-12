/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '@/store';
import AuthProxy from '@/proxies/AuthProxy';
import * as types from './mutation-types';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const login = ({ commit }, user) => {
  new AuthProxy({filter_ : JSON.stringify({'uuid': user.adminId, 'password': user.password_plain})})
    .login()
    .then((response) => {
      console.log(response);
      if(response.result === "ok" && response.result_obj.length > 0) {
        commit(types.LOGIN, response.result_obj[0]);
        store.dispatch('account/me');
        Vue.router.push({
          name: "Organization"
        });
      } else {
        alert("로그인 정보를 다시 확인하세요.");
      }
    })
    .catch(() => {
      console.log('Request failed...');
    });
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  location.href = "/";
};

export default {
  check,
  login,
  logout,
};
