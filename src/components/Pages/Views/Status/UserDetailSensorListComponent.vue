<template>
  <modal :show.sync="isShow"
         footerClasses="justify-content-center"
         modalClasses="modal-lg"
         bodyClasses="modal-body1"
         type="notice">
    <h5 slot="header" class="modal-title">센서별 점검항목 결과</h5>
    <template>
      <el-table id="AgentListTable"
                style="width: 100%; margin-bottom: 10px;"
                :data="sensors"
                :header-cell-style="tableRowStyle"
                ref="AgentListTable">
        <el-table-column
          label="에이전트ID"
          prop="sensor_id">
          <template slot-scope="props">
            <a href="javascript:void(0);" style="word-break: break-all;"
               @click="viewSensorDetail(props.row)"> {{props.row.sensor_id}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="IP"
          prop="ip_address">
        </el-table-column>
        <el-table-column
          label="MAC"
          width="150"
          prop="mac">
        </el-table-column>
        <el-table-column
          label="컴퓨터명"
          prop="host_name">
        </el-table-column>
        <el-table-column
          width="80"
          label="점수">
          <template slot-scope="props">
            {{ Math.trunc(props.row.total_score) }}
          </template>
        </el-table-column>
      </el-table>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in $store.state.category.categories"
          :key="item.categoryId"
          :label="item.categoryName"
          :name="item.categoryId">
          <el-table id="InspectItemListTable"
                    style="width: 100%; margin-bottom: 10px;"
                    :data="inspectList"
                    :header-cell-style="tableRowStyle"
                    ref="InspectItemListTable">
            <el-table-column
              prop="item_name"
              label="점검항목">
            </el-table-column>
            <el-table-column
              label="상태"
              prop="item_count"
              width="200">
              <template slot-scope="props">
                {{ props.row.result > 0 ? "취약" : "안전" }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
  </modal>
</template>

<script>
  import Vue from 'vue'
  import {Card, Modal} from 'src/components/UIComponents'
  import {Table, TableColumn, Button, Checkbox, TabPane, Tabs} from 'element-ui'
  import VueMoment from 'vue-moment'
  import {mapState} from "vuex";
  import ScoreStatusProxy from "../../../../proxies/ScoreStatusProxy";

  Vue.use(VueMoment)

  export default {
    name: "UserDetailSensorListComponent",
    created: function () {
      this.$store.dispatch('category/findAll');
    },
    components: {
      Card,
      Modal,
      elTabPane: TabPane,
      elTabs: Tabs,
      elButton : Button,
      elCheckbox: Checkbox,
      elTable : Table,
      elTableColumn : TableColumn,
    },
    props: {

    },
    watch: {
      categoriesAlias(newValue, oldValue) {
        if(newValue.length > 0) {
          this.activeName = newValue[0].categoryId;
          this.getInspectItemResultBySensorId(this.selectedSensorId, this.activeName, this.date);
        }
      },
    },
    computed: {
      ...mapState({
        categoriesAlias: state => state.category.categories,
      }),
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      showModal(isShow, userId, date) {
        this.date = date;
        let params = {
          userId: userId,
          date: date
        };
        new ScoreStatusProxy()
        .getSensorTotalScoreByUserIdAndResultDate(params)
        .then((response) => {
          this.sensors = response.sensorScore;
          if(this.sensors.length > 0) {
            this.selectedSensorId = this.sensors[0].sensor_id;
          }
          this.$store.dispatch('category/findAll');
        });
        this.isShow = isShow;
      },
      getInspectItemResultBySensorId(sensorId, categoryId, date) {
        let params = {
          sensorId: sensorId,
          categoryId: categoryId,
          date: date
        };
        new ScoreStatusProxy()
          .getInspectItemResultBySensorId(params)
          .then((response) => {
            this.inspectList = response.inspectItemResult;
          });
      },
      handleClick(tab, event) {
        this.activeName = tab.name;
        this.getInspectItemResultBySensorId(this.selectedSensorId, this.activeName, this.date);
      },
      viewSensorDetail(row) {
        this.selectedSensorId = row.sensor_id;
        this.activeName = this.$store.state.category.categories[0].categoryId;
        this.getInspectItemResultBySensorId(this.selectedSensorId, this.activeName, this.date);
      }
    },
    data() {
      return {
        inspectList: [],
        date: null,
        activeName: null,
        sensors: [],
        selectedSensorId: null,
        isShow: false,
      }
    }
  }
</script>

<style scoped>

</style>
