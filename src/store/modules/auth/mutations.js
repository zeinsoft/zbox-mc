/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue';
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT,
} from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [CHECK](state) {
    state.authenticated = !!$cookies.get('admin_id_token');
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `${$cookies.get('admin_id_token')}`;
    }
  },

  [LOGIN](state, user) {
    state.authenticated = true;
    $cookies.set('admin_id_token', user.uuid, 0)
    $cookies.set('admin_id', user.uuid, 0)
    $cookies.set('admin_name', user.name, 0)
    Vue.$http.defaults.headers.common.Authorization = user.uuid;
    // Vue.$http.defaults.headers.common.Authorization = `${token}`;
  },

  /*[LOGIN](state, token) {
    state.authenticated = true;
    $cookies.set('admin_id_token', token)
    Vue.$http.defaults.headers.common.Authorization = `${token}`;
  },*/

  [LOGOUT](state) {
    state.authenticated = false;
    $cookies.remove('admin_id_token')
    $cookies.remove('admin_id')
    $cookies.remove('admin_name')
    Vue.$http.defaults.headers.common.Authorization = '';
  },
};
