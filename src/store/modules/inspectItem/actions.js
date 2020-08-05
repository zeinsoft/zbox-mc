import Vue from 'vue';
import store from '@/store';
import InspectItemsProxy from '@/proxies/InspectItemsProxy';
import * as types from './mutation-types';

export const findAll = ({ commit }, param) => {
  new InspectItemsProxy(param)
    .all()
    .then((response) => {
      commit(types.LIST, response);
    });
};

export const createInspectItem = ({ commit }, param) => {
  new InspectItemsProxy()
    .create(param)
    .then((response) => {
      if(response.header.returnCode === "OK") {
        Vue.router.push({
          name: 'InspectItem',
          params: {categoryId : param.categoryId}
        });
      } else {
        alert(response.header.resultMessages);
      }
    });
};

export const updateInspectItem = ({ commit }, param) => {
  new InspectItemsProxy()
    .update(param.inspectItemId, param)
    .then((response) => {
      if (response.header.returnCode === "OK") {
        Vue.router.push({
          name: 'InspectItem',
          params: {categoryId : param.categoryId}
        });
      } else {
        alert(response.header.resultMessages);
      }
    });
};

export default {
  createInspectItem,
  findAll,
  updateInspectItem,
};
