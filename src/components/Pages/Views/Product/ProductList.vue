<template>
  <div>
    <card>
      <el-table id="TargetListTable"
                style="width: 100%; margin-bottom: 10px;"
                :data="$store.state.product.prods"
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
            <el-button type="primary" icon="el-icon-plus" v-on:click="register">제품 등록</el-button>
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

Vue.use(VueMoment)

export default {
  name: "ProductList",
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
    this.$store.dispatch('common/setMenuTitle', "제품관리");
    this.changePage();
  },
  methods: {
    tableRowStyle() {
      return this.$store.state.common.tableHeaderCellStyle;
    },
    changePage() {
      let param = {
      };
      this.$store.dispatch('product/findAll', param);
    },
    handleEdit(index, row) {
      Vue.router.push({name: 'ProductView', params: {uuid: row.uuid}});
    },
    register() {
      Vue.router.push({name: 'ProductRegistration'})
    },
  },
  computed: {
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
