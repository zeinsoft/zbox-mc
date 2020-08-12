import Vue from "vue";
import VueRouter from "vue-router";
import routes1 from "./routes";
import store from '@/store';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  // mode: 'history',
  routes: routes1, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  // TODO : 권한 설정되면 아래 주석 제거
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    next({
      name: 'Login',
    });
  } else {
    if (to.matched.some(m => m.meta.auth) ) {
      store.dispatch('account/me');
    }
    next();
  }

  next();
});

Vue.router = router;

export default router;
