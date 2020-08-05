<template>
  <management-detail-select-type v-on:historyBack="historyBack" v-on:updateConfig="updateConfig" ></management-detail-select-type>
</template>

<script>
  import Vue from 'vue'
  import {
  } from 'element-ui';
  import ConfigProxy from "../../../../proxies/ConfigProxy";
  import ManagementDetailSelectType from "./ManagementDetailSelectType";

  export default {
    name: "ManagementDetail",
    components: {
      ManagementDetailSelectType,
    },
    created: function () {
      this.getConfig(this.$route.params.configId);
    },
    methods: {
      /**
       * 설정 조회
       * @param configId
       */
      getConfig(configId) {
        new ConfigProxy()
        .find(configId)
        .then((response) => {
          this.config = response.config;
          this.$store.dispatch('common/setMenuTitle', "설정관리 > " + response.config.configName);
        })
      },
      /**
       * 설정 수정
       * @param config
       */
      updateConfig(config) {
        new ConfigProxy()
        .updateConfig(config)
        .then((response) => {

        })
      },
      /**
       * 설정관리 화면으로 이동
       */
      historyBack() {
        let params = {
          categoryId : this.config.categoryId,
        };
        Vue.router.push({name: 'Management', params: params});
      },
    },
    data() {
      return {
        config: {
          configTemplateId: null,
          configId: null,
          configName: null,
          categoryId: null,
          type: null,
          description: null,
          useFlag: null,
          comboList: null,
        },
      }
    }
  }
</script>

<style scoped>

</style>
