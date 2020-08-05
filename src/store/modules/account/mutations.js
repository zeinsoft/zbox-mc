import {ME, MY_MENUS} from './mutation-types';

export default {
  [ME](state, response) {
    state.userId = response.user.adminId;
    state.userName = response.user.adminName;
    state.roleCode = response.role.roleCode;
    state.mainUrl = response.role.mainUrl;
  },
  [MY_MENUS](state, response) {
    state.myMenus = response.menus;
  }
};
