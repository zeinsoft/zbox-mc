<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="playbook" :rules="rules" ref="playbook" label-width="120px">
      <el-row>
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
            실행할 Task 선택
          </el-form-item>
          <el-form-item label="parameters" prop="arguments">
            <el-input v-model="playbook.argument" type="textarea" :rows="4"></el-input>
            <div>
              parameters sample : {
                "arg1" : "test"
              }
            </div>
          </el-form-item>
          <el-form-item label="server return">
            <el-switch v-model="playbook.serverReturn"></el-switch>
            제품의 서버로 결과 전달 여부
          </el-form-item>
          <el-form-item label="server url" prop="url" v-if="playbook.serverReturn">
            <el-input v-model="playbook.url"></el-input>
            <div>
              결과 값을 전달할 서버 url
            </div>
          </el-form-item>
          <el-form-item label="client return">
            <el-switch v-model="playbook.clientReturn"></el-switch>
              제품의 agent web console로 결과 전달 여부
          </el-form-item>
          <el-form-item label="대상" prop="target">
            <el-select v-model="playbook.target" style="width: 100%;">
              <el-option
                v-for="item in this.$store.state.target.targets"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
            Target 리스트에 등록한 대상
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
  import PlayBookProxy from "../../../../proxies/PlayBookProxy";
  import moment from 'moment-timezone'
  import VueMoment from "vue-moment";
  import {uuid} from 'vue-uuid';

  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(VueMoment, {
    moment,
  })

  export default {
    name: "PlayBookRegistration",
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
      this.$store.dispatch('target/findAll', param);
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
                if(this.playbook.argument !== '') {
                  this.executeObject.parameters = JSON.parse(this.playbook.argument);
                }
                this.playBookObject.execute.push(this.executeObject);

                this.playBookObject.transactionId = uuid.v4();

                this.playBookObject.target.id.push(this.playbook.target);
                console.log(JSON.stringify(this.playBookObject));

                this.playBookParam.contents = JSON.stringify(this.playBookObject);
                this.playBookParam.name = this.playbook.name;
                new PlayBookProxy()
                .create(this.playBookParam)
                .then((response) => {
                  Vue.router.push({name: 'PlayBookList'});
                });
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
          target: {
            id: [],
            agent: [],
            user: [],
            dept: [],
          },
          schedule: '',
        },
        playbook: {
          name: '',
          task: '',
          argument: '',
          serverReturn: false,
          clientReturn: false,
          url: '',
          target: '',
        },
        executeObject: {
          executeId : '',
          parameters: null,
          taskId : '',
          action : []
        },
        serverAction : {
          target: "server",
          type : "restful",
          method : "post",
          url : '',
        },
        clientAction : {
          target: "client",
          type : "return",
        },
        playBookParam : {
          name: '',
          uuid : '',
          contents : '',
          hash: '',
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
