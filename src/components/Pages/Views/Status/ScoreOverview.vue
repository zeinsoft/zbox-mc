<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <card>
          <status-search-form ref="statusSearchForm" name="Score" :form="form" v-on:search="search"></status-search-form>
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
            <el-col :span="6">
              <h6 class="card-title text-center">보안평균점수</h6>
              <doughnut-chart v-if="percentage !== null"
                              :data="chartData"
                              :height="180"
                              :secondary-color="secondaryColor"
                              :color="chartColor">
              </doughnut-chart>
            </el-col>
            <el-col :span="12">
              <el-row v-if="categoryTotalScores.length > 0" style="margin-bottom: 10px;" v-for="item in this.categoryTotalScores"
                      :key="item.category_name">
                <el-col :span="8">{{item.category_name}}</el-col>
                <el-col :span="16"><el-progress :text-inside="true" :stroke-width="26" :color="getScoreColor(item.total_score)" :format="getScoreFormat" :percentage="parseInt(item.total_score)"></el-progress></el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <stats-card v-if="scoreDistribution != null" :type="good.type"
                          :icon="good.icon"
                          :small-title="good.title"
                          :title="good.value">
              </stats-card>
              <stats-card v-if="scoreDistribution != null" :type="bad.type"
                          :icon="bad.icon"
                          :small-title="bad.title"
                          :title="bad.value">
              </stats-card>
            </el-col>
          </card>
        </el-row>
        <el-row :gutter="10">
          <card>
            <h6>{{ getTableTitle}}</h6>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="(item, index) in this.tabList"
                :key="item.key"
                :label="item.label"
                :name="item.key">
                <dept-score-list-component v-if="parseInt(activeName) == item.key && targetData === 'dept'" v-on:changeUserView="changeUserView" v-on:changePage="getScoreStatusByDept" :list="list" :per-page="pagination.perPage" :total-cnt="totalCnt"></dept-score-list-component>
                <user-score-list-component v-if="parseInt(activeName) == item.key && targetData === 'user'" v-on:viewUserDetail="viewUserDetail" v-on:changePage="getScoreStatusByDept" :list="list" :per-page="pagination.perPage" :total-cnt="totalCnt"></user-score-list-component>
              </el-tab-pane>
            </el-tabs>
          </card>
        </el-row>
      </el-col>
    </el-row>
    <user-detail-sensor-list-component ref="sensorModal"></user-detail-sensor-list-component>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Select, DatePicker, Form, FormItem, Table, TableColumn, Button, Row, Col, Input, Radio, Checkbox, Progress, TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
  import VueMoment from 'vue-moment'
  import vueNumeralFilterInstaller from 'vue-numeral-filter';
  import DeptTree from "../Common/DeptTree";
  import DoughnutChart from "../../../UIComponents/Charts/DoughnutChart";
  import StatsCard from "../../../UIComponents/Cards/StatsCard";
  import DeptScoreListComponent from "./DeptScoreListComponent";
  import UserScoreListComponent from "./UserScoreListComponent";
  import StatusSearchForm from "./StatusSearchForm";
  import ScoreStatusProxy from "../../../../proxies/ScoreStatusProxy";
  import moment from 'moment-timezone'
  import DeptProxy from "../../../../proxies/DeptProxy";
  import UserDetailSensorListComponent from "./UserDetailSensorListComponent";

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
  Vue.use(Input)
  Vue.use(Radio)
  Vue.use(Checkbox)
  Vue.use(Progress)
  Vue.use(TabPane)
  Vue.use(Tabs)

  export default {
    components: {
      Card,
      DeptTree,
      [DatePicker.name]: DatePicker,
      elSelect: Select,
      elForm: Form,
      elFormItem: FormItem,
      elRadio : Radio,
      elCheckbox: Checkbox,
      CircleChartCard,
      elProgress: Progress,
      doughnutChart: DoughnutChart,
      StatsCard,
      elTabPane: TabPane,
      elTabs: Tabs,
      DeptScoreListComponent,
      UserScoreListComponent,
      StatusSearchForm,
      UserDetailSensorListComponent
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "보안점수현황");
      this.form.date = moment().format('YYYY-MM-DD');
      this.search();
    },
    methods: {
      search() {
        this.percentage = null;
        this.categoryTotalScores = [];
        this.scoreDistribution = null;
        this.getTotalScoreByDeptCodes();
        this.getCategoryTotalScore();
        this.getScoreStatusByDept(1);
      },
      handleClick(tab, event) {
        this.totalScore = parseInt(tab.name);
        this.totalCnt = 0;
        this.pagination.currentPage = 1;
        this.list = [];
        this.getScoreStatusByDept(1);
      },
      getTotalScoreByDeptCodes() {
        new ScoreStatusProxy()
          .getTotalScoreByDeptCodes(this.form.date, this.form.deptCode, this.form.include)
          .then((response) => {
            this.percentage = response.totalScore;
            this.getScoreDistribution(response.totalScore);
          });
      },
      getCategoryTotalScore() {
        new ScoreStatusProxy()
          .getCategoryTotalScore(this.form.date, this.form.deptCode, this.form.include)
          .then((response) => {
            this.categoryTotalScores = response.categoryTotalScore;
          });
      },
      getScoreDistribution(totalScore) {
        new ScoreStatusProxy()
          .getScoreDistribution(this.form.date, this.form.deptCode, this.form.include, totalScore)
          .then((response) => {
            this.scoreDistribution = response.scoreDistribution;
            this.good.value = response.scoreDistribution.good_count + "명";
            this.bad.value = response.scoreDistribution.bad_count + "명";
          });
      },
      getScoreStatusByDept(page) {
        this.pagination.currentPage = page;
        this.totalCnt = 0;
        this.list = [];
        let param = {
          page: page,
          date: this.form.date,
          deptCode : this.form.deptCode,
          subDeptYn: this.form.include ? "Y" : "N",
          rows: this.pagination.perPage,
          totalScore: this.totalScore
        };
        this.targetData = this.form.target;
        if(this.form.target === "dept") {
          new ScoreStatusProxy()
            .getScoreStatusByDept(param)
            .then((response) => {
              this.list = response.list;
              this.totalCnt = response.totalCnt;
            });
        } else {
          new ScoreStatusProxy()
            .getScoreStatusByUser(param)
            .then((response) => {
              this.list = response.list;
              this.totalCnt = response.totalCnt;
            });
        }

      },
      handleNodeClick(data) {
        this.form.deptCode = data.deptCode;
      },
      getScoreFormat(score) {
        return score + "점";
      },
      getScoreColor(score) {
        return Vue.getScoreColor(score);
      },
      changeUserView(row) {
        this.targetData = "user";
        this.form.target = "user";
        this.setDeptTree(row.dept_code);
        this.handleNodeClick({deptCode : row.dept_code});
        this.search();
      },
      setDeptTree(deptCode) {
        new DeptProxy()
          .getDeptPathList(deptCode)
          .then((response) => {
            let depts = [];
            response.depts.forEach(s => {
              depts.push(s);
            });
            this.defaultDeptCode = depts;
          });
      },
      viewUserDetail(row) {
        this.$refs.sensorModal.showModal(true, row.user_id, this.form.date);
      }
    },
    computed: {
      chartData() {
        return [this.percentage, 100 - this.percentage]
      },
      chartColor() {
        return this.getScoreColor(this.percentage);
      },
      getTableTitle() {
        if(this.targetData === "dept") {
          return "조회된 부서 : " + this.totalCnt + "개";
        } else {
          return "조회된 사용자 : " + this.totalCnt + "명";
        }
      }
    },
    data() {
      return {
        tabList: [
          {
            key: "0",
            label: "전체",
          },
          {
            key: "90",
            label: "90점 이상",
          },
          {
            key: "80",
            label: "89~80점",
          },
          {
            key: "70",
            label: "79~70점",
          },
          {
            key: "60",
            label: "69~60점",
          },
          {
            key: "50",
            label: "50점 이하",
          }
        ],
        defaultDeptCode: ["all"],
        form : {
          date : null,
          target : "dept",
          deptCode : "all",
          include: true,
        },
        targetData : "dept",
        list: [],
        totalCnt : 0,
        totalScore : 0,
        categoryTotalScores: [],
        scoreDistribution: null,
        percentage: null,
        labels: "",
        color: "#4acccd",
        secondaryColor: "#f4f3ef",
        bad : {
          type: 'warning',
          icon: 'nc-icon nc-minimal-down',
          title: '평균점수미만',
          value: '0명',
          footerText: 'Updated now',
          footerIcon: 'nc-icon nc-refresh-69'
        },
        good : {
          type: 'success',
          icon: 'nc-icon nc-minimal-up',
          title: '평균점수이상',
          value: '0명',
          footerText: 'Last day',
          footerIcon: 'nc-icon nc-calendar-60'
        },
        activeName: '0',
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
  .el-form-item {
    margin-bottom: 0px;
  }
</style>
