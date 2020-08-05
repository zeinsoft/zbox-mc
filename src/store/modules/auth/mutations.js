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

  [LOGIN](state, token) {
    state.authenticated = true;
    $cookies.set('admin_id_token', token)
    Vue.$http.defaults.headers.common.Authorization = `${token}`;
  },

  [LOGOUT](state) {
    state.authenticated = false;
    $cookies.remove('admin_id_token')
    Vue.$http.defaults.headers.common.Authorization = '';
  },
};
