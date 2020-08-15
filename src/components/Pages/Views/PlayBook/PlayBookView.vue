<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="playbook" :rules="rules" ref="playbook" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="이름" prop="name">
            <el-input v-model="playbook.name"></el-input>
          </el-form-item>
          <el-form-item label="내용" prop="contents" v-if="false">
            <el-input v-model="playbook.contents" type="textarea" :rows="20"></el-input>
          </el-form-item>
          <el-form-item label="내용">
            <div id="jsonViewer" style="background-color: black;padding-left: 10px;"></div>
          </el-form-item>
          <el-form-item label="Hash" prop="hash">
            <el-input v-model="playbook.hash"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button @click.prevent="historyBack">뒤로</el-button>
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
  import JSONFormatter from 'json-formatter-js'

  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(VueMoment, {
    moment,
  })

  export default {
    name: "PlayBookView",
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
      this.playbook.uuid = this.$route.params.uuid;
      this.$store.dispatch('common/setMenuTitle', "PlayBook 보기");
      new PlayBookProxy()
      .find(this.playbook.uuid)
      .then((response) => {
        this.playbook = response.result_obj;
        this.playbook.contents = JSON.stringify(JSON.parse(this.playbook.contents), undefined, 4);
        const formatter = new JSONFormatter(JSON.parse(this.playbook.contents), 10, {theme: 'dark'});
        document.getElementById("jsonViewer").appendChild(formatter.render());
      })
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

                this.playBookObject.transactionId = uuid.v4();

                this.playBookObject.target = this.playbook.target;
                console.log(JSON.stringify(this.playBookObject));

                this.playBookParam.contents = JSON.stringify(this.playBookObject);
                new PlayBookProxy()
                .create(this.playBookParam)
                .then((response) => {

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
        type: '',     // edit:수정 , new:추가
        readonly: true,  // 수정화면에서 읽기전용필드 설정용
        playbook: {
          name: '',
          contents: '',
          hash: '',
        },
        rules: {
          name: [
            {required: true, message: '이름을 입력하세요.', trigger: 'change'}
          ],
          contents: [
            {required: true, message: '내용을 입력하세요.', trigger: 'change'}
          ],
        }
      }
    },

  }
</script>

<style scoped>
  body {
    padding: 3rem;
    font-size: 16px;
  }

  json-type {
    width: 100%;
    min-height: 30rem;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 0.8rem;
    line-height: 1.2;
  }
</style>
