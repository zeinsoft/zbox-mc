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
              <!--<el-button type="success" icon="el-icon-delete" @click="handleDelete(props.$index, props.row)">
              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
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
  import {Select, DatePicker, Form, FormItem, Table, TableColumn, Button, Row, Col, Input, Radio, Checkbox, Progress, TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import PlayBookProxy from "../../../../proxies/PlayBookProxy";

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
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "PlayBook 리스트");
      this.changePage();
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      changePage() {
        let param = {
        };
        this.$store.dispatch('playbook/findAll', param);
      },
      handleEdit(index, row) {
        Vue.router.push({name: 'PlayBookView', params: {uuid: row.uuid}});
      },
      handleDelete(index, row) {
        if(confirm("삭제하시겠습니까?")) {
          new PlayBookProxy()
            .destroy(row.uuid)
            .then((response) => {
              this.changePage();
            })
        }

      },
      register() {
        Vue.router.push({name: 'PlayBookRegistration'})
      },
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
      }
    }
  }
</script>

<style scoped>

</style>
