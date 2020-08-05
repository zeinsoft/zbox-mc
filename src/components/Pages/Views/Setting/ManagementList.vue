<template>
  <div>
    <el-table id="managementList"
              style="width: 100%; margin-bottom: 10px;"
              :data="$store.state.config.configList"
              :header-cell-style="tableRowStyle"
              ref="managementList">
      <el-table-column
        prop="categoryName"
        label="카테고리">
      </el-table-column>
      <el-table-column
        label="이름"
        prop="configName">
      </el-table-column>
      <el-table-column
        label="ID"
        prop="configId">
      </el-table-column>
      <el-table-column
        label="설정값"
        prop="display">
      </el-table-column>
      <el-table-column
        label="설명"
        width="300"
        prop="description">
      </el-table-column>
      <el-table-column
        label="관리">
        <template slot-scope="props">
          <el-button type="success" icon="el-icon-edit" @click="handleEdit(props.$index, props.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Table, TableColumn, Button} from 'element-ui'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Button)

  export default {
    name: "ManagementList",
    components: {
    },
    props: {
      categoryId: {
        type: String,
        default: true
      },
    },
    created: function () {
      this.$store.dispatch('config/findAll', {});
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      handleEdit(index, row) {
        Vue.router.push({name: 'ManagementDetail', params: {configId: row.configId, categoryId: this.categoryId}});
      },
    }
  }
</script>

<style scoped>

</style>
