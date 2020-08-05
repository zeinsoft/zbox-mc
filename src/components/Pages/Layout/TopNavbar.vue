<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar">

        </navbar-toggle-button>
      </div>
      <h4>{{ $store.state.common.menuTitle }}</h4>
    </div>

    <template slot="navbar-menu">

    </template>
  </navbar>
</template>
<script>
  import { Navbar, NavbarToggleButton } from 'src/components/UIComponents'

  export default {
    components: {
      Navbar,
      NavbarToggleButton
    },
    data() {
      return {
        activeNotifications: false,
        showNavbar: false
      }
    },
    methods: {
      toggleSidebar() {
          this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize()
      },

    }
  }

</script>
<style scoped>
  h4, .h4 {
    font-size: 1.714em;
    line-height: 1.45em;
    margin-top: 7px;
    margin-bottom: 1px;
  }
</style>
