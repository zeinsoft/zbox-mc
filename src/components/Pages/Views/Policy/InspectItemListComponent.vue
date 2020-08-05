<template>
  <div>
    <el-table id="InspectItemListTable"
              style="width: 100%; margin-bottom: 10px;"
              :data="$store.state.inspectItem.inspectItems"
              :header-cell-style="tableRowStyle"
              ref="InspectItemListTable">
      <el-table-column
        prop="inspectItemId"
        label="점검항목ID">
      </el-table-column>
      <el-table-column
        label="점검항목"
        prop="itemName">
        <template slot-scope="props">
          <a href="javascript:void(0);" style="word-break: break-all;"
             @click="editRow(props.row)"> {{props.row.itemName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="보안레벨"
        prop="weight"
        width="100">
      </el-table-column>
      <el-table-column
        label="설명"
        prop="itemComment">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import VueMoment from 'vue-moment'
  import vueNumeralFilterInstaller from 'vue-numeral-filter';

  Vue.use(vueNumeralFilterInstaller)
  Vue.use(VueMoment)
  Vue.use(Table)
  Vue.use(TableColumn)

  export default {
    name: "InspectItemListComponent",
    components: {
    },
    props: {
      categoryId: String,
    },
    created: function () {
      this.getList(this.categoryId);
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      getList(categoryId) {
        let param = {
          categoryId : categoryId
        };
        this.$store.dispatch('inspectItem/findAll', param);
      },
      editRow(row) {
        this.$emit('detailRow', row);
      },
    },
    data() {
      return {
        param: null,
      }
    },
  }
</script>

<style scoped>

</style>
