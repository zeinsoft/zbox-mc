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
  new AuthProxy()
    .publicKey()
    .then((response) => {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(response.publicKey);
      user.password = encrypt.encrypt(user.password_plain);
      new AuthProxy()
        .login(user)
        .then((response) => {
          if(response.header.returnCode === "OK") {
            commit(types.LOGIN, response.token);
            store.dispatch('account/me');
            Vue.router.push({
              name: "StatusOverview"
            });
          } else {
            alert(response.header.resultMessages);
          }
        })
        .catch(() => {
          console.log('Request failed...');
        });
      }
    )
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
