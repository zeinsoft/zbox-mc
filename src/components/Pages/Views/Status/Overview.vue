<template>
  <div>
    <card class="text-center">
      <div class="table-full-width table-tasks">
        <el-table class="table-striped"
                  border
                  style="width: 100%; margin-bottom: 10px"
                  :data="this.totalStatus"
                  :header-cell-style="tableRowStyle">
          <el-table-column
            label="날짜">
            <template slot-scope="props">
              {{ new Date() | moment('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <el-table-column
            label="총사용자수">
            <template slot-scope="props">
              {{ props.row.user_count | numeral('0,0')}}명
            </template>
          </el-table-column>
          <el-table-column
            label="설치자수">
            <template slot-scope="props">
              {{ props.row.install_user_count | numeral('0,0')}}명
            </template>
          </el-table-column>
          <el-table-column
            label="미설치자수">
            <template slot-scope="props">
              {{ props.row.user_count - props.row.install_user_count | numeral('0,0')}}명
            </template>
          </el-table-column>
          <el-table-column
            label="설치율">
            <template slot-scope="props">
              {{ props.row.install_user_count / props.row.user_count * 100 | numeral('0,0')}}%
            </template>
          </el-table-column>
          <el-table-column
            label="사용PC수">
            <template slot-scope="props">
              {{ props.row.install_sensor_count | numeral('0,0')}}대
            </template>
          </el-table-column>
          <el-table-column
            label="대상PC수">
            <template slot-scope="props">
              {{ props.row.target_sensor_count | numeral('0,0')}}대
            </template>
          </el-table-column>
          <!-- <el-table-column
             label="로그온PC수">
             <template slot-scope="props">
               {{ props.row.etcCount | numeral('0,0')}}개
             </template>
           </el-table-column>-->
          <el-table-column
            label="미점검PC수">
            <template slot-scope="props">
              {{ props.row.install_sensor_count - props.row.target_sensor_count | numeral('0,0')}}개
            </template>
          </el-table-column>
          <el-table-column
            label="통합점수">
            <template slot-scope="props">
              {{ props.row.total_score | numeral('0,0')}}점
            </template>
          </el-table-column>
        </el-table>
      </div>
    </card>
    <card>
      <el-row :gutter="10">
        <el-col :span="8">
          <card>
            <h5 class="card-title">점수대별 분포현황</h5>
            <comvoy-pie v-if="scoreDistributionStatus.datasets[0].data.length > 0"
                        :datasets="scoreDistributionStatus.datasets"
                        :labels="scoreDistributionStatus.labels"></comvoy-pie>
          </card>
        </el-col>
        <el-col :span="8">
          <card>
            <h5 class="card-title">일별 통합점수 추이</h5>
            <comvoy-line v-if="dailyTotalScoreStatus.datasets[0].data.length > 0"
                         :datasets="dailyTotalScoreStatus.datasets"
                         :labels="dailyTotalScoreStatus.labels"
            :options="dailyTotalScoreStatus.options"></comvoy-line>
          </card>
        </el-col>
        <el-col :span="8">
          <card>
            <h5 class="card-title">카테고리별 현황</h5>
            <comvoy-bar v-if="categoryTotalScoreStatus.datasets[0].data.length > 0"
                        :datasets="categoryTotalScoreStatus.datasets"
                        :labels="categoryTotalScoreStatus.labels"
                        :options="categoryTotalScoreStatus.options"></comvoy-bar>
          </card>
        </el-col>
      </el-row>
    </card>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Row, Col} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import vueNumeralFilterInstaller from 'vue-numeral-filter';
  import StatusProxy from "../../../../proxies/StatusProxy";
  import moment from 'moment-timezone'
  import Pie from "../../Components/Charts/Pie";
  import Line from "../../Components/Charts/Line";
  import Bar from "../../Components/Charts/Bar";

  Vue.use(VueMoment, {
    moment,
  })

  Vue.use(vueNumeralFilterInstaller)
  Vue.use(VueMoment)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Row)
  Vue.use(Col)

  export default {
    components: {
      Card,
      comvoyPie: Pie,
      comvoyLine: Line,
      comvoyBar: Bar,
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "전체현황");
      this.getTotalStatus();
      this.getScoreDistributionStatus();
      this.getDailyTotalScoreStatus();
      this.getCategoryTotalScoreStatus();
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderFont10CellStyle;
      },
      getTotalStatus() {
        new StatusProxy()
          .getTotalStatus()
          .then((response) => {
            this.totalStatus.push(response.totalStatus);
          });
      },
      getScoreDistributionStatus() {
        new StatusProxy()
          .getScoreDistributionStatus()
          .then((response) => {
            this.scoreDistributionStatus.datasets[0].data = response.scoreDistributionStatus;
          });
      },
      getDailyTotalScoreStatus() {
        new StatusProxy()
          .getDailyTotalScoreStatus()
          .then((response) => {
            this.dailyTotalScoreStatus.datasets[0].data = response.datas;
            this.dailyTotalScoreStatus.labels = response.labels;
          });
      },
      getCategoryTotalScoreStatus() {
        new StatusProxy()
          .getCategoryTotalScoreStatus()
          .then((response) => {
            this.categoryTotalScoreStatus.datasets[0].data = response.datas;
            this.categoryTotalScoreStatus.labels = response.labels;
          });
      },
      colorize(opaque, ctx) {
        let v = ctx.dataset.data[ctx.dataIndex];
        return Vue.getScoreColor(v)
      }
    },
    data() {
      return {
        totalStatus: [],
        scoreDistributionStatus: {
          labels: ['90점이상', '80~70점', '70~60점', '60~50점', '50점이하'],
          datasets: [{
            backgroundColor: [
              '#007fe0',
              '#00bb63',
              '#eace00',
              '#ff8200',
              '#ff0000'
            ],
            data: []
          }],
        },
        dailyTotalScoreStatus: {
          labels: [],
          datasets: [{
            label: '통합점수',
            data: [],
          }],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: false,
            tooltips: {
              position: 'nearest',
              mode: 'index',
              intersect: false,
              yPadding: 10,
              xPadding: 10,
              caretSize: 8,
            },
            elements: {
              point: {
                backgroundColor: this.colorize.bind(null, false),
                hoverBackgroundColor: this.colorize.bind(null, false),
                radius: 5,
                pointStyle: 'circle',
                hoverRadius: 10,
              }
            },
            scales: {
              yAxes: [{
                stacked: true
              }]
            }
          }
        },
        categoryTotalScoreStatus: {
          labels: [],
          datasets: [{
            label: '통합점수',
            data: [],
          }],
          options: {
            legend: false,
            tooltips: {
              position: 'nearest',
              mode: 'index',
              intersect: false,
              yPadding: 10,
              xPadding: 10,
              caretSize: 8,
            },
            elements: {
              rectangle: {
                backgroundColor: this.colorize.bind(null, false),
                // borderColor: this.colorize.bind(null, true),
                borderWidth: 2,
                responsive: true,
                maintainAspectRatio: false
              }
            }
          },
        },
      }
    }
  }

</script>
<style>

</style>
