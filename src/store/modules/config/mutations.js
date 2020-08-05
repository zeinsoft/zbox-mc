import {LIST} from './mutation-types';

export default {
  [LIST](state, response) {
    state.configList = response.configList;
  },
};
