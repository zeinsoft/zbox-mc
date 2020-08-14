<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="playbook" :rules="rules" ref="playbook" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="부서 선택">
            <el-row>
              <el-tag v-for="dept in playbook.target.depts" :key="dept.code" closable>
                {{dept.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" v-if="type === 'new'" @click="addTarget()">부서 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="사용자 선택">
            <el-row>
              <el-tag v-for="user in playbook.target.users" :key="user.name" closable :type="user.type">
                {{user.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" v-if="type === 'new'" @click="addTarget()">사용자 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="센서 선택">
            <el-row>
              <el-tag v-for="sensor in playbook.target.sensors" :key="sensor.agent_id" closable :type="sensor.type">
                {{sensor.agent_id}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" v-if="type === 'new'" @click="addTarget()">센서 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="이름" prop="name">
            <el-input v-model="playbook.name"></el-input>
          </el-form-item>
          <!--<el-form-item label="내용" prop="contents">
            <el-input v-model="playbook.contents" type="textarea" :rows="3"></el-input>
          </el-form-item>-->
          <el-form-item label="Task" prop="task">
            <el-select v-model="playbook.task" style="width: 100%;">
              <el-option
                v-for="item in this.$store.state.task.tasks"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="arguments" prop="arguments">
            <el-input v-model="playbook.argument" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="server return">
            <el-switch v-model="playbook.serverReturn"></el-switch>
          </el-form-item>
          <el-form-item label="server url" prop="url" v-if="playbook.serverReturn">
            <el-input v-model="playbook.url"></el-input>
          </el-form-item>
          <el-form-item label="client return">
            <el-switch v-model="playbook.clientReturn"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('playbook')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('playbook')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('playbook')">리셋</el-button>
        <el-button @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
    <modal :show.sync="modals.isShow"
           footerClasses="justify-content-center"
           type="notice"
           modalClasses="modal-lg">
      <h5 slot="header" class="modal-title">Target 등록</h5>
      <template>
        <organization v-on:selectTargetDept="selectTargetDept" v-on:selectTargetUser="selectTargetUser"
                      v-on:selectTargetSensor="selectTargetSensor" :component-type="this.componentType"></organization>
      </template>
    </modal>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {Modal} from 'src/components/UIComponents'
  import {
    Tag,
    Select,
    DatePicker,
    Form,
    FormItem,
    Button,
    Option,
    Input,
    Row,
    Col,
    Table,
    TableColumn,
    Switch
  } from 'element-ui';
  import TaskProxy from "../../../../proxies/TaskProxy";
  import moment from 'moment-timezone'
  import VueMoment from "vue-moment";
  import Organization from "../Organization/Organization";
  import {uuid} from 'vue-uuid';

  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(VueMoment, {
    moment,
  })

  export default {
    name: "UserManagementRegistration",
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
      elTag: Tag,
      Modal,
      Organization,
    },
    created: function () {
      if (this.$route.params.uuid !== undefined) {
        this.type = "edit";
        this.playbook.uuid = this.$route.params.uuid;
        this.$store.dispatch('common/setMenuTitle', "PlayBook 수정");

        /*new TaskProxy()
          .find(this.task.uuid)
          .then((response) => {
            this.task = response.result_obj;
            this.task.create_ts_text = moment(this.task.create_ts).format('YYYY-MM-DD');
            this.task.update_ts_text = moment(this.task.update_ts).format('YYYY-MM-DD');
          })*/

      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "PlayBook 등록");
      }
      let param = {};
      this.$store.dispatch('task/findAll', param);
    },
    methods: {
      addTarget() {
        this.modals.isShow = true;
      },
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.type === "new") {
              if (confirm("등록하시겠습니까?")) {
                // return 설정
                if(this.playbook.serverReturn) {
                  this.serverAction.url = this.playbook.url;
                  this.executeObject.action.push(this.serverAction);
                }
                if(this.playbook.clientReturn) {
                  this.executeObject.action.push(this.clientAction);
                }
                // task 설정
                this.executeObject.executeId = uuid.v4();
                this.executeObject.taskId = this.playbook.task;
                this.playBookObject.execute.push(this.executeObject);
                // target 설정
                if(this.playbook.target.depts.length > 0) {
                  this.playBookObject.target.depts = this.playbook.target.depts;
                }
                if(this.playbook.target.users.length > 0) {
                  this.playBookObject.target.users = this.playbook.target.users;
                }
                if(this.playbook.target.sensors.length > 0) {
                  this.playBookObject.target.sensors = this.playbook.target.sensors;
                }
                this.playBookObject.transactionId = uuid.v4();
                console.log(JSON.stringify(this.playBookObject));
              }
            } else {
              if (confirm("수정하시겠습니까?")) {
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
      /**
       * 부서 추가
       * @param target
       */
      selectTargetDept(target) {
        if (this.playbook.target.depts.length === 0) {
          this.playbook.target.depts.push(target);
        } else {
          let duplicateCount = 0;
          this.playbook.target.depts.forEach(s => {
            if (s.code === target.code) {
              duplicateCount++;
            }
          }, target.code);
          if (duplicateCount === 0) this.playbook.target.depts.push(target);
        }
      },
      /**
       * 사용자 선택
       */
      selectTargetUser(target) {
        if (this.playbook.target.users.length === 0) {
          this.playbook.target.users = target;
        } else {
          target.forEach(t => {
              let duplicateCount = 0;
              this.playbook.target.users.forEach(s => {
                if (s.code === t.code) {
                  duplicateCount++;
                }
              }, t.code);
              if (duplicateCount === 0) this.playbook.target.users.push(t);
            }
          )
        }
      },
      /**
       * 센서 선택
       * @param target
       */
      selectTargetSensor(target) {
        if (this.playbook.target.sensors.length === 0) {
          this.playbook.target.sensors = target;
        } else {
          target.forEach(t => {
              let duplicateCount = 0;
              this.playbook.target.sensors.forEach(s => {
                if (s.agent_id === t.agent_id) {
                  duplicateCount++;
                }
              }, t.agent_id);
              if (duplicateCount === 0) this.playbook.target.sensors.push(t);
            }
          )
        }
      }
    },
    data() {
      return {
        componentType: "modal",
        modals: {
          isShow: false,
        },
        type: '',     // edit:수정 , new:추가
        readonly: true,  // 수정화면에서 읽기전용필드 설정용
        playBookObject: {
          func: "execute",
          transactionId: '',
          execute: [],
          target: {},
          schedule: {},
        },
        playbook: {
          name: '',
          task: '',
          argument: '',
          serverReturn: false,
          clientReturn: false,
          url: '',
          target: {
            depts: [],
            users: [],
            sensors: []
          },
        },
        executeObject: {
          executeId : null,
          parameters: null,
          taskId : '',
          action : []
        },
        serverAction : {
          target: "server",
          type : "restful",
          method : "post",
          url : null,
        },
        clientAction : {
          target: "client",
          type : "return",
        },
        rules: {
          name: [
            {required: true, message: '이름을 입력하세요.', trigger: 'change'}
          ],
          contents: [
            {required: true, message: '내용을 입력하세요.', trigger: 'change'}
          ],
          task: [
            {required: true, message: 'Task를 선택하세요.', trigger: 'change'}
          ],
          url: [
            {required: true, message: 'url을 입력하세요.', trigger: 'change'}
          ],
        }
      }
    },

  }
</script>

<style scoped>
  .el-tag.el-tag--info {
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    color: #435a8e;
  }

  .el-tag, .el-tag.el-tag--info {
    background-color: #badde6 !important;
  }
</style>
