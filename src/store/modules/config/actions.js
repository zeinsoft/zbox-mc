import ConfigProxy from "../../../proxies/ConfigProxy";
import store from '@/store';
import * as types from './mutation-types';

/**
 * 설정목록
 * @param commit
 * @param param
 */
export const findAll = ({ commit }, param) => {
  new ConfigProxy(param)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export default {
  findAll
};
