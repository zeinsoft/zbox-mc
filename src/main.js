import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import VeeValidate, { Validator } from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko'
import lang from 'element-ui/lib/locale/lang/ko'
import locale from 'element-ui/lib/locale'
import App from './App.vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import './plugins/vuex';
import './plugins/axios';
import './plugins/bootstrap';
import './plugins/font-awesome';
import { i18n } from './plugins/vue-i18n';
import './plugins/jsencrypt';
import './plugins/jquery';


import store from './store';

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';
import CommonUtil from  './plugins/common-util';

// router setup
import router from "./routes/index";

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'

import './registerServiceWorker'

// plugin setup
Vue.use(CommonUtil)
Vue.use(VueRouter)
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar)
const config = {
  locale: 'ko',
  // inject: false
  fieldsBagName: 'veeFields',
};
Validator.localize({ko:ko})
locale.use(lang)
Vue.use(VeeValidate, config)

initProgress(router);

store.dispatch('auth/check');
store.dispatch('account/me');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  render: h => h(App),
  router,
  store
})
