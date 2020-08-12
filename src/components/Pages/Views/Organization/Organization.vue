<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <card>
          <!--<el-form class="form-horizontal" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="조직도" label-width="60px" prop="openDate">
                  <el-checkbox v-model="form.include">하위부서포함</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>-->
          <dept-tree v-on:handleNodeClick="handleNodeClick" :default-dept-code="defaultDeptCode"></dept-tree>
        </card>
      </el-col>
      <el-col :span="18">
        <card>
          <el-row :gutter="10">
            <form @submit.prevent="changePage(1)">
              <el-col :span="20">
                <div class="form-group">
                  <label>이름 or 아이디</label>
                  <el-input v-model="form.searchName" placeholder="이름 or 아이디">
                  </el-input>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pull-right-top24">
                  <el-button type="primary" native-type="submit" icon="el-icon-search">검색</el-button>
                </div>
              </el-col>
            </form>
          </el-row>
          <el-table id="UserListTable"
                    style="width: 100%; margin-bottom: 10px;"
                    :data="$store.state.organization.accounts"
                    :header-cell-style="tableRowStyle"
                    ref="UserListTable">
            <el-table-column
              prop="deptName"
              label="부서명">
              <template slot-scope="props">
                   {{selectedDept.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="이름"
              prop="name">
              <template slot-scope="props">
                <a href="javascript:void(0);" style="word-break: break-all;"
                   @click="showRow(props.row)"> {{props.row.name}}</a>
              </template>
            </el-table-column>
            <el-table-column
              label="사번"
              prop="code">
            </el-table-column>
            <el-table-column
              label="사용PC수"
              prop="sensors">
              <template slot-scope="props">
                {{props.row.sensors != null ? props.row.sensors.length : 0}}
              </template>
            </el-table-column>
            <el-table-column
              label="관리"
              prop="goods_name">
              <template slot-scope="props">
                <el-button type="success" icon="el-icon-edit" @click="handleEdit(props.$index, props.row)">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="24">
            <p-pagination class="pull-right"
                          v-on:input="changePage"
                          v-model="pagination.currentPage"
                          :per-page="parseInt(pagination.perPage)"
                          :total="$store.state.organization.total">
            </p-pagination>
          </el-col>
            <el-col :span="24">
              <div class="pull-right">
                <el-button type="primary" icon="el-icon-plus" v-on:click="register">직원 등록</el-button>
              </div>
            </el-col>
          </el-row>
        </card>
        <card v-if="selectedUserId !== ''">
          <el-table id="AgentListTable"
                    style="width: 100%; margin-bottom: 10px;"
                    :data="$store.state.sensor.sensors"
                    :header-cell-style="tableRowStyle"
                    ref="AgentListTable">
            <el-table-column
              label="에이전트ID"
              prop="sensorId">
            </el-table-column>
            <el-table-column
              label="IP"
              prop="ipAddress">
            </el-table-column>
            <el-table-column
              label="MAC"
              prop="mac">
            </el-table-column>
            <el-table-column
              label="컴퓨터명"
              prop="hostName">
            </el-table-column>
            <el-table-column
              label="등록일">
              <template slot-scope="props">
                {{ props.row.regDate | moment('YYYY-MM-DD')}}
              </template>
            </el-table-column>
          </el-table>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Select, DatePicker, Form, FormItem, Table, TableColumn, Button, Row, Col, Input, Radio, Checkbox, Progress, TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import InspectItemListComponent from "../Policy/InspectItemListComponent";
  import DeptTree from "../Common/DeptTree";
  import StatusSearchForm from "../Status/StatusSearchForm";
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import VueMoment from 'vue-moment'

  Vue.use(VueMoment)

  export default {
    name: "Organization",
    components: {
      InspectItemListComponent,
      elCard: Card,
      elTabPane: TabPane,
      elTabs: Tabs,
      elButton : Button,
      DeptTree,
      StatusSearchForm,
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
      // this.form.deptCode = this.$route.params.deptUuid;
      this.$store.dispatch('common/setMenuTitle', "조직도");
      this.changePage(1);
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      changePage(page) {
        this.selectedUserId = '';
        let param = {
          page: page,
          searchName: encodeURI(encodeURIComponent(this.form.searchName)),
          deptCode : this.form.deptCode,
          subDeptYn: this.form.include ? "Y" : "N",
          rows: this.pagination.perPage
        };
        this.$store.dispatch('organization/findAll', param);
      },
      register() {
        Vue.router.push({name: 'UserRegistration'});
      },
      handleNodeClick(data) {
        this.selectedDept = data;
        this.form.deptCode = data.uuid;
        // Vue.router.push({name: 'Organization', params: {deptUuid: data.uuid}});
        this.changePage(1);
      },
      showRow(row) {
        this.selectedUserId = row.userId;
        this.$store.dispatch('sensor/findAll', {userId : row.uuid});
      },
      handleEdit(index, row) {
        Vue.router.push({name: 'UserRegistration', params: {userId: row.uuid}});
      },
    },
    computed: {
    },
    data() {
      return {
        selectedDept: null,
        defaultDeptCode: ["all"],
        selectedUserId : '',
        form: {
          include: true,
          searchName: '',
          deptCode: 'all',
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
