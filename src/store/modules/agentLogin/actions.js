import Vue from 'vue';
import store from '@/store';
import VueNativeSock from "vue-native-websocket";

export const sendMessage = ({ commit }, message) => {
  console.log(message);
  Vue.prototype.$socket.sendObj(message)
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
};
