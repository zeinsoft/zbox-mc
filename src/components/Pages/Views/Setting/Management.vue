<template>
  <div>
    <card>
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="설정목록" name="SettingList">
              <management-list :category-id="activeName"></management-list>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import ManagementList from "./ManagementList";

  Vue.use(VueMoment)

  export default {
    name: "Management",
    components: {
      elCard: Card,
      elTabPane: TabPane,
      elTabs: Tabs,
      managementList: ManagementList,
    },
    created: function () {
      if (this.$route.params.categoryId !== undefined) {
        // this.activeName = this.$route.params.categoryId;
      }
      this.$store.dispatch('common/setMenuTitle', "설정관리");
    },
    methods: {
      handleClick(tab, event) {
      },
    },
    data() {
      return {
        activeName: "SettingList",
      }
    }
  }
</script>

<style scoped>

</style>
