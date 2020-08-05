<template>
  <div class="sidebar"
       :data-color="backgroundColor"
       :data-active-color="activeColor">
    <div class="logo" style="padding: 9px;cursor: pointer;" @click="goHome">
      <el-row :gutter="10">
        <el-col :span="24" class="text-center">
          <span class="simple-text logo-normal" style="font-family: Montserrat;font-weight: 700;">{{ title }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot>

      </slot>
      <ul class="nav">
        <slot name="links">
          <sidebar-item v-for="(link, index) in this.$store.state.account.myMenus"
                        :key="link.name + index"
                        :link="link">

            <sidebar-item v-for="(subLink, index) in link.children"
                          :key="subLink.name + index"
                          :link="subLink"
                          style="margin-left: 10px">
            </sidebar-item>
          </sidebar-item>
        </slot>

      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import 'perfect-scrollbar/dist/css/perfect-scrollbar.css'
  import {Row, Col} from 'element-ui'

  Vue.use(Row)
  Vue.use(Col)

  export default {
    props: {
      title: {
        type: String,
        default: 'Z-BOX MC',
        description: 'Z-BOX MC'
      },
      backgroundColor: {
        type: String,
        default: 'white',
        validator: (value) => {
          let acceptedValues = ['white', 'brown', 'black']
          return acceptedValues.indexOf(value) !== -1
        },
        description: 'Sidebar background color (white|brown|black)'
      },
      activeColor: {
        type: String,
        default: 'danger',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        },
        description: 'Sidebar active text color (primary|info|success|warning|danger)'
      },
      logo: {
        type: String,
        default: '/static/img/background/logo.png',
        description: 'Sidebar Logo'
      },
      sidebarLinks: {
        type: Array,
        default: () => [],
        description: 'Sidebar links. Can be also provided as children components (sidebar-item)'
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      }
    },
    methods: {
      async initScrollBarAsync () {
        let isWindows = navigator.platform.startsWith('Win');
        if(!isWindows) {
          return;
        }
        const PerfectScroll = await import('perfect-scrollbar')
        PerfectScroll.initialize(this.$refs.sidebarScrollArea)
      },
      goHome () {
        Vue.router.push({
          name: 'StoreOverview',
        });
      },
    },
    created: function () {
        // 메뉴 리스트
        this.$store.dispatch('account/getMyMenus');
    },
    mounted () {
      this.initScrollBarAsync()
    },
    beforeDestroy () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    }
  }

</script>
<style>
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu{
      display: none;
    }
  }
</style>
