import UserProxy from '@/proxies/UserProxy';
import store from '@/store';
import * as types from './mutation-types';

export const me = ({ commit }) => {
  commit(types.ME);
  /*new UserProxy()
    .me()
    .then((response) => {
      if(response.user.roleCode === "USER") {
        // 로그아웃 처리
        store.dispatch('auth/logout');
      } else {
        commit(types.ME, response);
      }
    })
    .catch(() => {
    });*/
};

export const getMyMenus = ({ commit }) => {
  new UserProxy()
    .getMyMenus()
    .then((response) => {
      commit(types.MY_MENUS, response);
    })
    .catch(() => {

    })
};

export default {
  me,
  getMyMenus,
};
