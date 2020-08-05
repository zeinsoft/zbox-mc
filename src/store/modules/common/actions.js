import Vue from 'vue';
import store from '@/store';
import * as types from './mutation-types';

export const setMenuTitle = ({ commit }, menuTitle) => {
  commit(types.MENU_TITLE, menuTitle);
};



export default {
  setMenuTitle,
};
