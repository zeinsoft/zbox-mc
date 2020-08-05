<template>
  <div>
    <el-table id="InspectItemListTable"
              style="width: 100%; margin-bottom: 10px;"
              :data="list"
              :header-cell-style="tableRowStyle"
              ref="InspectItemListTable">
      <el-table-column
        prop="item_name"
        label="점검항목">
        <template slot-scope="props">
          <a href="javascript:void(0);" style="word-break: break-all;"
             @click="showRow(props.row)"> {{props.row.item_name}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="전체"
        prop="item_count"
        width="100">
      </el-table-column>
      <el-table-column
        label="안전"
        prop="good_count"
        width="100">
      </el-table-column>
      <el-table-column
        label="취약"
        prop="bad_count"
        width="100">
      </el-table-column>
    </el-table>
    <el-table v-if="itemName" id="InspectItemDetailList"
              style="width: 100%; margin-bottom: 10px;"
              :data="sensors"
              :header-cell-style="tableRowStyle"
              ref="InspectItemDetailList">
      <el-table-column
        prop="dept_name"
        label="부서명">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="사용자">
      </el-table-column>
      <el-table-column
        prop="sensor_id"
        label="에이전트ID">
      </el-table-column>
      <el-table-column
        :label="itemName">
        <template slot-scope="props">
          {{ props.row.result > 0 ? "취약" : "안전"}}
        </template>
      </el-table-column>
      <!--<el-table-column
        label="상태"
        prop="goods_name"
        width="100">
        <template slot-scope="props">

        </template>
      </el-table-column>-->
    </el-table>
    <el-col :span="24" v-if="itemName">
      <p-pagination class="pull-right"
                    v-on:input="getCheckSensorItemStatus"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="pagination.totalCnt">
      </p-pagination>
    </el-col>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import VueMoment from 'vue-moment'
  import vueNumeralFilterInstaller from 'vue-numeral-filter';
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import CheckStatusProxy from "../../../../proxies/CheckStatusProxy";

  Vue.use(vueNumeralFilterInstaller)
  Vue.use(VueMoment)
  Vue.use(Table)
  Vue.use(TableColumn)

  export default {
    name: "InspectItemScoreListComponent",
    components: {
      PPagination
    },
    created: function () {
      this.itemName = null;
      this.inspectItemId = null;
    },
    props: {
      list: Array,
      form: Object,
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      showRow(row) {
        this.itemName = row.item_name;
        this.inspectItemId = row.inspect_item_id
        this.getCheckSensorItemStatus(1);
      },
      getCheckSensorItemStatus(page) {
        let param = {
          page: page,
          date: this.form.date,
          deptCode : this.form.deptCode,
          subDeptYn: this.form.include ? "Y" : "N",
          rows: this.pagination.perPage,
          inspectItemId : this.inspectItemId
        };
        new CheckStatusProxy().getCheckSensorItemStatus(param)
          .then((response) => {
            this.sensors = response.list;
          });
      }
    },
    data() {
      return {
        columns: [],
        multipleSelection: [],
        sensors: [],
        param: null,
        page: 1,
        itemName: null,
        inspectItemId: null,
        pagination: {
          totalCnt: 0,
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
        },
      }
    },
  }
</script>

<style scoped>

</style>
