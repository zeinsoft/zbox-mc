import Vue from 'vue';
import {
  MENU_TITLE,
  ROLES,
  MAIN_INFO,
} from './mutation-types';

export default {

  [MENU_TITLE](state, menuTitle) {
    state.menuTitle = menuTitle;
  },

  [ROLES](state, response) {
    state.roles = response.roles;
  },

  [MAIN_INFO](state, mainInfo) {
    state.mainInfo = mainInfo;
  }

};
