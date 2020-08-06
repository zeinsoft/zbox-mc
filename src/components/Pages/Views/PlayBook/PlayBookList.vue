<template>
  <div>
      <card>
        <el-table id="UserListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.task.tasks"
                  :header-cell-style="tableRowStyle"
                  ref="UserListTable">
          <el-table-column
            label="이름"
            prop="name">
          </el-table-column>
          <el-table-column
            label="관리">
            <template slot-scope="props">
              <el-button type="success" icon="el-icon-edit" @click="handleEdit(props.$index, props.row)">
              </el-button>
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

  Vue.use(VueMoment)

  export default {
      name: "UserManagement",
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
          /*searchId: this.form.searchId,
          searchName: encodeURI(encodeURIComponent(this.form.searchName)),*/
        };
        this.$store.dispatch('playbook/findAll', param);
      },
      handleEdit(index, row) {
        Vue.router.push({name: 'TaskRegistration', params: {uuid: row.uuid}});
      },
      handleEditScript(index, row) {
        if(row.scripts.length > 0) {
          Vue.router.push({name: 'PlayBookEdit', params: {uuid: row.uuid, scriptUuid: row.scripts[0]}});
        } else {
          Vue.router.push({name: 'PlayBookEdit', params: {uuid: row.uuid}});
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
