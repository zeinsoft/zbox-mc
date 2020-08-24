<template>
  <div>
    <card class="w-100">
      <el-form class="form-horizontal" :model="task" :rules="rules" ref="task" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="이름" prop="name">
              <el-input v-model="task.name"></el-input>
            </el-form-item>
            <el-form-item label="설명" prop="desc">
              <el-input v-model="task.desc" type="textarea" :rows="3"></el-input>
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
    <div>
      <card>
        <el-table id="TaskListTable"
                  style="width: 100%; margin-bottom: 10px;"
                  :data="$store.state.task.scripts"
                  :header-cell-style="tableRowStyle"
                  ref="TaskListTable">
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
    <card class="w-100">
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Select, DatePicker, Form, FormItem, Button, Option, Input, Row, Col, Table, TableColumn, Switch} from 'element-ui';
  import TaskProxy from "../../../../proxies/TaskProxy";
  import MongoProxy from "@/proxies/MongoProxy";
  import moment from 'moment-timezone'
  import VueMoment from "vue-moment";

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
    },
    created: function () {
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
            this.$store.dispatch("task/getScriptByTargetUUID", this.task.uuid);


            this.$store.dispatch("script/findAll", {});
          })
      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "Task 등록");
      }
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      historyBack() {
        history.back();
      },
      handleEditScript(index, row) {
        Vue.router.push({name: 'ScriptEdit', params: {uuid: row.uuid}});
      },
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
    },
    data() {
      return {
        type: '',     // edit:수정 , new:추가
        readonly: true,  // 수정화면에서 읽기전용필드 설정용
        task: {
          uuid: '',
          name: '',
          desc: '',
          prods: [],
          scripts: [],
          create_ts_text: '',
          update_ts_text: '',
        },
        script: '',
        rules: {
          name: [
            { required: true, message: '이름을 입력하세요.', trigger: 'change' }
          ]
        }
      }
    },

  }
</script>

<style scoped>

</style>
