<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <card>
          <status-search-form ref="statusSearchForm" name="Check" :form="form" v-on:search="search"></status-search-form>
          <dept-tree v-on:handleNodeClick="handleNodeClick" :default-dept-code="defaultDeptCode"></dept-tree>
        </card>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="10">
          <card style="margin-bottom: 15px">
            <el-col :span="24">
              <h6>{{this.form.date | moment('YYYY년 MM월 DD일 요약정보') }}</h6>
            </el-col>
          </card>
        </el-row>
        <el-row :gutter="10">
          <card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="(item, index) in this.categoryTotalScores"
                           :key="item.category_id"
                           :label="item.category_name + ' (' + parseInt(item.total_score) + '점)'"
                           :name="item.category_id">
                <inspect-item-score-list-component :form="form" :list="list" v-if="activeName == item.category_id"></inspect-item-score-list-component>
              </el-tab-pane>
            </el-tabs>
          </card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Form, FormItem, Table, TableColumn, Button, Row, Col, TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import vueNumeralFilterInstaller from 'vue-numeral-filter';
  import DeptTree from "../Common/DeptTree";
  import StatusSearchForm from "./StatusSearchForm";
  import InspectItemScoreListComponent from "./InspectItemScoreListComponent";
  import moment from 'moment-timezone'
  import ScoreStatusProxy from "../../../../proxies/ScoreStatusProxy";
  import CheckStatusProxy from "../../../../proxies/CheckStatusProxy";

  Vue.use(VueMoment, {
    moment,
  })

  Vue.use(vueNumeralFilterInstaller)
  Vue.use(VueMoment)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Button)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(TabPane)
  Vue.use(Tabs)

  export default {
    components: {
      InspectItemScoreListComponent,
      Card,
      DeptTree,
      elForm: Form,
      elFormItem: FormItem,
      elTabPane: TabPane,
      elTabs: Tabs,
      StatusSearchForm,
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "보안점검현황");
      this.form.date = moment().format('YYYY-MM-DD');
      this.search();

    },
    methods: {
      search() {
        this.activeName = '';
        this.getCategoryTotalScore();
      },
      getCategoryTotalScore() {
        new ScoreStatusProxy()
          .getCategoryTotalScore(this.form.date, this.form.deptCode, this.form.include)
          .then((response) => {
            this.categoryTotalScores = response.categoryTotalScore;
            if(this.categoryTotalScores.length > 0) {
              this.activeName = this.categoryTotalScores[0].category_id;
              this.getCheckItemStatusByCategoryId();
            }
          });
      },
      getCheckItemStatusByCategoryId() {
        let param = {
          date: this.form.date,
          deptCode : this.form.deptCode,
          subDeptYn: this.form.include ? "Y" : "N",
          categoryId : this.activeName,
        };
        new CheckStatusProxy().getCheckItemStatusByCategoryId(param)
        .then((response) => {
          this.list = response.list;
        });
      },
      handleClick(tab, event) {
        this.activeName = tab.name;
        this.getCheckItemStatusByCategoryId();
      },
      handleNodeClick(data) {
        this.form.deptCode = data.deptCode;
      },

    },
    computed: {
    },
    data() {
      return {
        defaultDeptCode: ["all"],
        activeName: '',
        categoryTotalScores: [],
        list: [],
        form : {
          date : null,
          target : "dept",
          deptCode : "all",
          include: true,
        },
      }
    }
  }

</script>
<style scoped>
  .el-form-item {
    margin-bottom: 0px;
  }
</style>
