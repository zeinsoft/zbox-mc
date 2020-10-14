import Vue from 'vue';
import store from '@/store';
import VueNativeSock from "vue-native-websocket";
import * as types from "@/store/modules/inspectItem/mutation-types";

export const sendMessage = ({ commit }, message) => {
  console.log(message);
  Vue.prototype.$socket.sendObj(message)
};

export const agentLogin = ({ commit }, param) => {
  console.log(param);
  let login = {
    func: "is_valid_login",
    params: {
      user_name: param.userName,
      user_code: param.userId,
      pc_id: param.pcId,
      sso_key: param.ssoKey,
    }
    }
  store.dispatch('sendMessage', login);
};

/**
 * comvoy agent에 ws 연결
 * @param commit
 */
export const connectSocket = ({ commit }) => {
  console.log("connectSocket");
  let wsUri = "ws://127.0.0.1:1337";
  /*if (process.env.NODE_ENV !== 'production') {
    wsUri = "ws://10.211.55.13:8765";
  }*/
  Vue.use(VueNativeSock, wsUri, {
    store: store,
    format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 2, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 5000 // (Number) how long to initially wait before attempting a new (1000)
  });
};

export default {
  sendMessage,
  connectSocket,
  agentLogin,
};
