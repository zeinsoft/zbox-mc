<template>
  <div>
    <el-table id="deptScoreTable"
              style="width: 100%; margin-bottom: 10px;"
              :data="list"
              :header-cell-style="tableRowStyle"
              ref="deptScoreTable">
      <el-table-column
        label="순위"
        prop="row_num"
        width="95">
      </el-table-column>
      <el-table-column
        label="상태"
        width="100">
        <template slot-scope="props">
          {{ getStatus(Math.trunc(props.row.total_score)) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="dept_name"
        label="부서명">
        <template slot-scope="props">
          <a href="javascript:void(0);" style="word-break: break-all;"
             @click="changeUserView(props.row)"> {{props.row.dept_name}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_count"
        label="대상 사용자(명)">
      </el-table-column>
      <el-table-column
        label="보안점수"
        align="center">
        <template slot-scope="props">
          {{ Math.trunc(props.row.total_score) }}
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <p-pagination class="pull-right"
                    v-on:input="changePage"
                    v-model="pagination.currentPage"
                    :per-page="perPage"
                    :total="totalCnt">
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

  Vue.use(vueNumeralFilterInstaller)
  Vue.use(VueMoment)
  Vue.use(Table)
  Vue.use(TableColumn)

  export default {
    name: "DeptScoreListComponent",
    components: {
      PPagination
    },
    created: function () {
    },
    props: {
      perPage: Number,
      list: Array,
      totalCnt: Number,
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      // 페이지 변경
      changePage(page) {
        this.$emit('changePage', page);
      },
      getStatus(totalScore) {
        return Vue.getStatus(totalScore);
      },
      changeUserView(row) {
        this.$emit('changeUserView', row);
      }
    },
    data() {
      return {
        minus : 0,
        columns: [],
        param: null,
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
