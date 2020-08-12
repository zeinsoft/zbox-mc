<template>
  <div class="user">
    <div class="photo" style="background-color: white">
      <i class="fa fa-user" aria-hidden="true" style="margin: 10px"></i>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="javascript:void(0)">
         <span>
           {{ $store.state.account.userName }}
           <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">
            <!--<li>
              <a href="javascript:void(0)" @click.prevent="editInfo">
                <span class="sidebar-mini-icon"><i class="fa fa-id-card-alt" aria-hidden="true"></i></span>
                <span class="sidebar-normal">내정보 수정</span>
              </a>
            </li>-->
            <li>
              <a href="javascript:void(0)" @click.prevent="logout">
                <span class="sidebar-mini-icon"><i class="fa fa-sign-out-alt" aria-hidden="true"></i></span>
                <span class="sidebar-normal">Logout</span>
              </a>
            </li>
          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import {CollapseTransition} from 'vue2-transitions'
  import Vue from 'vue';
  import store from '@/store';

  export default {
    components: {
      CollapseTransition
    },
    data() {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      },
      logout() {
        store.dispatch('auth/logout');
      },
      editInfo() {
        Vue.router.push({
          name: 'UserManagementRegistration',
          params: {adminId: this.$store.state.account.userId},
          query: {myInfo: true}
        });
      },
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
