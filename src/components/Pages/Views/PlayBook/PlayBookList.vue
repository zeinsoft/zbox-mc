<template>
  <div>
      <card>
        <el-table id="UserListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.playbook.playbooks"
                  :header-cell-style="tableRowStyle"
                  ref="UserListTable">
          <el-table-column
            label="이름"
            prop="name">
          </el-table-column>
          <!--<el-table-column
            label="contents"
            prop="contents">
          </el-table-column>-->
          <el-table-column
            label="transactionId">
            <template slot-scope="props">
              {{ getTransactionId(props.row.contents) }}
            </template>
          </el-table-column>
          <el-table-column
            label="등록일">
            <template slot-scope="props">
              {{ props.row.create_ts | moment('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <el-table-column
            label="관리">
            <template slot-scope="props">
              <el-button type="success" icon="el-icon-edit" @click="handleEdit(props.$index, props.row)">
              </el-button>
              <el-button type="success" icon="el-icon-video-play" @click="handleRun(props.$index, props.row)">
              </el-button>
              <el-button type="success" icon="el-icon-notebook-2" @click="handleLog(props.$index, props.row)">
              </el-button>
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
              <el-button type="primary" icon="el-icon-plus" v-on:click="register">PlayBook 등록</el-button>
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
  import PlayBookProxy from "../../../../proxies/PlayBookProxy";
  import PPagination from 'src/components/UIComponents/Pagination.vue'

  Vue.use(VueMoment)

  export default {
      name: "PlayBookList",
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
      this.$store.dispatch('common/setMenuTitle', "PlayBook 리스트");
      this.changePage(1);
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      changePage(page) {
        let param = {
        };
        this.$store.dispatch('playbook/findAll', param);
      },
      handleEdit(index, row) {
        Vue.router.push({name: 'PlayBookView', params: {uuid: row.uuid}});
      },
      handleRun(index, row) {
        if(confirm("실행하시겠습니까?")) {
          new PlayBookProxy()
            .runPlayBook(row.uuid)
            .then((response) => {
              console.log(response);
            })
        }
      },
      handleLog(index, row) {
        console.log(JSON.parse(row.contents).transactionId);
        Vue.router.push({name: 'PlayBookLog', params: {transactionId: JSON.parse(row.contents).transactionId}});
      },
      handleDelete(index, row) {
        if(confirm("삭제하시겠습니까?")) {
          new PlayBookProxy()
            .destroy(row.uuid)
            .then((response) => {
              this.changePage(1);
            })
        }

      },
      register() {
        Vue.router.push({name: 'PlayBookRegistration'})
      },
      getTransactionId(contents) {
        return JSON.parse(contents).transactionId;
      }
    },
    computed: {
    },
    data() {
      return {
        activeName: 'security1',
        form: {
          searchId: '',
          searchName: ''
        },
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
