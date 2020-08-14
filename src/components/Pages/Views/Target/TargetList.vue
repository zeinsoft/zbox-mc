<template>
  <div>
      <card>
        <el-table id="TargetListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.target.targets"
                  :header-cell-style="tableRowStyle"
                  ref="TargetListTable">
          <el-table-column
            label="이름"
            prop="name">
          </el-table-column>
          <el-table-column
            label="내용"
            prop="desc">
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
              <el-button type="primary" icon="el-icon-plus" v-on:click="register">Target 등록</el-button>
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
    name: "TargetList",
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
      this.$store.dispatch('common/setMenuTitle', "Target 리스트");
      this.changePage();
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      changePage() {
        let param = {
        };
        this.$store.dispatch('target/findAll', param);
      },
      handleEdit(index, row) {
        Vue.router.push({name: 'TargetView', params: {uuid: row.uuid}});
      },
      handleEditScript(index, row) {
        if(row.scripts.length > 0) {
          Vue.router.push({name: 'PlayBookEdit', params: {uuid: row.uuid, scriptUuid: row.scripts[0]}});
        } else {
          Vue.router.push({name: 'PlayBookEdit', params: {uuid: row.uuid}});
        }
      },
      register() {
        Vue.router.push({name: 'TargetRegistration'})
      },
    },
    computed: {
    },
    data() {
      return {
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
