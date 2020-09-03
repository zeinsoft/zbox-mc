<template>
  <div>
      <card>
        <el-table id="LogListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.playbook.playbook_results"
                  :header-cell-style="tableRowStyle"
                  ref="LogListTable">
          <el-table-column
            label="running_id"
            prop="running_id">
          </el-table-column>
          <el-table-column
            label="execute_id"
            prop="execute_id">
          </el-table-column>
          <el-table-column
            label="script_id"
            prop="script_id">
          </el-table-column>
          <el-table-column
            label="returncode"
            prop="returncode">
          </el-table-column>
          <el-table-column
            label="stderr"
            prop="stderr">
          </el-table-column>
          <el-table-column
            label="stdout"
            prop="stdout">
          </el-table-column>
          <el-table-column
            label="등록일">
            <template slot-scope="props">
              {{ props.row.create_ts | moment('YYYY-MM-DD HH:MM:ss')}}
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="12">
            <p-pagination class="pull-right"
                          v-on:input="changePage"
                          v-model="pagination.currentPage"
                          :per-page="parseInt(pagination.perPage)"
                          :total="$store.state.organization.total">
            </p-pagination>
          </el-col>
          <el-col :span="12">
            <div class="pull-right">
              <el-button @click.prevent="historyBack">뒤로</el-button>
            </div>
          </el-col>
        </el-row>
      </card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Form, FormItem, Table, TableColumn, Button, Input, Radio, Checkbox, TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import moment from "moment";
  import PlayBookProxy from "../../../../proxies/PlayBookProxy";
  import PPagination from 'src/components/UIComponents/Pagination.vue'


  Vue.use(VueMoment)

  export default {
      name: "PlayBookLog",
    components: {
      elCard: Card,
      elTabPane: TabPane,
      elTabs: Tabs,
      elButton : Button,
      elRadio : Radio,
      elForm: Form,
      elFormItem : FormItem,
      elCheckbox: Checkbox,
      elInput : Input,
      elTable : Table,
      elTableColumn : TableColumn,
      PPagination,
    },
    created: function () {
      this.transactionId = this.$route.params.transactionId;
      this.$store.dispatch('common/setMenuTitle', "PlayBook 실행로그");
      this.changePage(1);
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      changePage(page) {
        let param = {filter_ : JSON.stringify({'transaction_id': this.transactionId})};
        this.$store.dispatch('playbook/findAllPlayBookResult', param);
      },
      historyBack() {
        history.back();
      },
    },
    computed: {
    },
    data() {
      return {
        transactionId: '',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
        },
      }
    }
  }
</script>

<style scoped>

</style>
