import Vue from 'vue';
import store from '@/store';

import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR,
} from './mutation-types';

export default {

  [SOCKET_ONOPEN] (state, event)  {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  [SOCKET_ONCLOSE] (state, event)  {
    state.socket.isConnected = false;
  },
  [SOCKET_ONERROR] (state, event)  {
    console.error(state, event);
  },
  [SOCKET_ONMESSAGE] (state, message)  {
    console.info(state, message);
    state.socket.message = message;
    switch (state.socket.message.func) {
      case "is_valid_login":
        if(!state.socket.message.result.vaild) {
          alert("로그인정보를 다시 확인해주세요.");
        } else {
          alert("로그인 되었습니다.");
        }
        break;
    }
  },
  [SOCKET_RECONNECT](state, count) {
    console.info(state, count);
  },
  [SOCKET_RECONNECT_ERROR](state) {
    console.info(state, "컴보이 실행이 필요하다는 메시지 보여주기");
    state.socket.reconnectError = true;
    alert("Z-BOX 에이전트를 실행해주세요!");
  },
};
