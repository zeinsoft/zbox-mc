<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications transition-name="notification-list" transition-mode="out-in">

    </notifications>
    <router-view name="header"></router-view>
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
    <router-view name="footer"></router-view>
    <v-dialog/>
  </div>
</template>

<script>
    import Vue from 'vue'
    import vmodal from 'vue-js-modal'
    import { Card } from 'src/components/UIComponents';
    import { mapState } from 'vuex';

    Vue.use(vmodal, {dialog:true})
    export default {
        components: {
            Card,
        },
        watch: {

        },
        computed: {

        },
        data() {
            return {
                mainInfo: {}
            }
        },
        mounted() {

        }
    }
</script>
<style lang="css">

</style>
