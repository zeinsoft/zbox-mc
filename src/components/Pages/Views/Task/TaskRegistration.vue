<template>
  <div>
    <card class="w-100">
      <el-form class="form-horizontal" :model="task" :rules="rules" ref="task" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="제품" prop="prodUUid">
              <el-select v-model="task.prodUUid">
                <el-option
                  v-for="item in this.$store.state.product.prods"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="이름" prop="name">
              <el-input v-model="task.name"></el-input>
            </el-form-item>
            <el-form-item label="설명" prop="desc">
              <el-input v-model="task.desc" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="System">
              <el-select v-model="task.os_spec.system">
                <el-option
                  label="없음"
                  v-model="this.nullValue"></el-option>
                <el-option
                  label="Linux"
                  value="Linux"></el-option>
                <el-option
                  label="Windows"
                  value="Windows"></el-option>
                <el-option
                  label="Mac"
                  value="Mac"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="생성일" prop="create_ts" v-if="type === 'edit'">
              <el-input v-model="task.create_ts_text" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="수정일" prop="update_ts" v-if="type === 'edit'">
              <el-input v-model="task.update_ts_text" :readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="card-footer text-right">
          <el-button type="primary" v-if="type === 'new'" @click="submitForm('task')">등록</el-button>
          <el-button type="primary" v-if="type === 'edit'" @click="submitForm('task')">수정</el-button>
          <el-button v-if="type === 'new'" @click.prevent="resetForm('task')">리셋</el-button>
          <el-button @click.prevent="historyBack">취소</el-button>
        </div>
      </el-form>
    </card>
    <div v-if="this.type === 'edit'">
      <card>
        <el-table id="ScriptListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.task.scripts"
                  :header-cell-style="tableRowStyle"
                  ref="ScriptListTable">
          <el-table-column
            label="이름"
            prop="name">
          </el-table-column>
          <el-table-column
            label="설명"
            prop="desc">
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
              <el-button type="success" icon="el-icon-edit" @click="handleEditScript(props.$index, props.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <card class="w-100" v-if="this.type === 'edit'">
      <el-form class="form-horizontal" :model="task" :ref="task" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Script 추가" prop="name">
              <el-select v-model="script" style="width: 100%;">
                <el-option
                  v-for="item in this.$store.state.script.scripts"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="card-footer text-right">
          <el-button type="primary" @click="addScript()">추가</el-button>
        </div>
      </el-form>
    </card>
    <!--<card class="w-100" v-if="this.type === 'edit'">
      <el-form class="form-horizontal" label-width="120px">
        <template>
          <el-table id="OsVersionList"
                    style="width: 100%; margin-bottom: 10px;"
                    :data="this.osversions"
                    :header-cell-style="tableRowStyle"
                    ref="OsVersionList"
                    @selection-change="handleOSSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="system"
              prop="system">
            </el-table-column>
            <el-table-column
              label="name"
              prop="name">
            </el-table-column>
            <el-table-column
              label="release"
              prop="release">
            </el-table-column>
          </el-table>
          <el-col :span="24">
            <div class="pull-right">
              <el-button type="primary" icon="el-icon-plus" v-on:click="addOsVersion()">OS 삭제</el-button>
              <el-button type="primary" @click="addOS()">OS 추가</el-button>
            </div>
          </el-col>
        </template>
        <div class="card-footer text-right">

        </div>
      </el-form>
    </card>-->
    <modal :show.sync="modals.isShow"
           footerClasses="justify-content-center"
           type="notice"
           modalClasses="modal-lg">
      <h5 slot="header" class="modal-title">OS버전 리스트</h5>
      <template>
        <el-table id="OsVersionListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.osversion.osversions"
                  :header-cell-style="tableRowStyle"
                  ref="OsVersionListTable"
                  @selection-change="handleOSSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="system"
            prop="system">
          </el-table-column>
          <el-table-column
            label="name"
            prop="name">
          </el-table-column>
          <el-table-column
            label="release"
            prop="release">
          </el-table-column>
        </el-table>
        <el-col :span="24">
          <div class="pull-right">
            <el-button type="primary" icon="el-icon-plus" v-on:click="addOsVersion()">OS 추가</el-button>
          </div>
        </el-col>
      </template>
    </modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Select, DatePicker, Form, FormItem, Button, Option, Input, Row, Col, Table, TableColumn, Switch} from 'element-ui';
  import TaskProxy from "../../../../proxies/TaskProxy";
  import MongoProxy from "@/proxies/MongoProxy";
  import moment from 'moment-timezone'
  import VueMoment from "vue-moment";
  import {Modal} from 'src/components/UIComponents'
  import * as types from "@/store/modules/task/mutation-types";

  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(VueMoment, {
    moment,
  })

  export default {
    name: "TaskRegistration",
    components: {
      [DatePicker.name]: DatePicker,
      elSelect: Select,
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elOption: Option,
      elInput: Input,
      elRow: Row,
      elCol: Col,
      elSwitch: Switch,
      Modal,
    },
    created: function () {
      this.$store.dispatch("product/findAll", {});
      if(this.$route.params.uuid !== undefined) {
        this.type = "edit";
        this.task.uuid = this.$route.params.uuid;
        this.$store.dispatch('common/setMenuTitle', "Task 수정");

        new TaskProxy()
          .find(this.task.uuid)
          .then((response) => {
            this.task = response.result_obj;
            this.task.create_ts_text = moment(this.task.create_ts).format('YYYY-MM-DD');
            this.task.update_ts_text = moment(this.task.update_ts).format('YYYY-MM-DD');
            this.task.prodUUid = this.task.prods[0];
            this.$store.dispatch("task/getScriptByTargetUUID", this.task.uuid);
            this.$store.dispatch("script/findAll", {});
            this.getOsVersions();
          });

        // OS 정보 가져오기

      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "Task 등록");
        this.$store.dispatch("task/resetScriptByTarget");
      }
      this.$store.dispatch("osversion/findAll");
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      // Task 저장
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.type === "new") {
              if(confirm("등록하시겠습니까?")) {
                this.$store.dispatch("task/create", this.task);
              }
            } else {
              if(confirm("수정하시겠습니까?")) {
                new TaskProxy()
                  .update(this.task.uuid, this.task)
                  .then((response) => {
                    alert("수정되었습니다.");
                  })
              }
            }
          } else {
            return false;
          }
        });
      },
      // 입력내용 초기화
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 리스트로 이동
      historyBack() {
        history.back();
      },
      // script 수정화면으로 이동
      handleEditScript(index, row) {
        Vue.router.push({name: 'ScriptEdit', params: {uuid: row.uuid}});
      },
      // script 추가
      addScript() {
        if(confirm("Script를 추가하시겠습니까?")) {
          new MongoProxy()
            .create({
              left_table: "tasks",
              left_uuid: this.task.uuid,
              right_table: "scripts",
              right_uuid: this.script
            })
            .then((response) => {
              this.$store.dispatch("task/getScriptByTargetUUID", this.task.uuid);
            })
        }
      },
      // OS 선택창 띄우기
      addOS() {
        this.modals.isShow = true;
      },
      // OS 선택
      handleOSSelectionChange(val) {
        this.multipleSelection = val;
      },
      // OS 추가
      addOsVersion() {
        this.multipleSelection.forEach(os => {
          new MongoProxy()
            .create({
              left_table: "tasks",
              left_uuid: this.task.uuid,
              right_table: "osversions",
              right_uuid: os.uuid
            })
            .then((response) => {
            })
        });
        this.modals.isShow = false;
        this.getOsVersions();
      },
      getOsVersions() {
        new TaskProxy()
          .getOsVersionsByTargetUUID(this.task.uuid)
          .then((response) => {
            this.osversions = response.result_obj;
          });
      }
    },
    data() {
      return {
        modals: {
          isShow: false,
        },
        multipleSelection: [],
        type: '',     // edit:수정 , new:추가
        readonly: true,  // 수정화면에서 읽기전용필드 설정용
        task: {
          prodUUid: '',
          uuid: '',
          name: '',
          desc: '',
          prods: [],
          scripts: [],
          create_ts_text: '',
          update_ts_text: '',
          os_spec : {
            system: null,
            name: null,
            release: null,
            version: null
          },
        },
        osversions : [],
        script: '',
        rules: {
          prodUUid: [
            { required: true, message: '제품을 선택하세요.', trigger: 'change' }
          ],
          name: [
            { required: true, message: '이름을 입력하세요.', trigger: 'change' }
          ]
        },
        nullValue : null,
      }
    },

  }
</script>

<style scoped>

</style>
