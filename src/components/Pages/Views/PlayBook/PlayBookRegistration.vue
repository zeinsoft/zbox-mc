<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="palybook" ref="palybook" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="부서 선택" prop="name">
            <el-row>
              <el-tag v-for="dept in depts" :key="dept.code" closable>
                {{dept.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" v-if="type === 'new'" @click="addTarget()">부서 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="사용자 선택" prop="name">
            <el-row>
              <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
                {{tag.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" v-if="type === 'new'" @click="addTarget()">사용자 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="센서 선택" prop="name">
            <el-row>
              <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
                {{tag.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" v-if="type === 'new'" @click="addTarget()">센서 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="이름" prop="name">
            <el-input v-model="palybook.name"></el-input>
          </el-form-item>
          <el-form-item label="내용" prop="desc">
            <el-input v-model="palybook.contents" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="Task" prop="name">
            <el-select v-model="selectedTask" style="width: 100%;">
              <el-option
                v-for="item in tasks"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="arguments" prop="arguments">
            <el-input v-model="argument" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="target">
            <el-select v-model="target">
              <el-option
                label="server"
                value="server"></el-option>
              <el-option
                label="client"
                value="client"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="url" prop="name" v-if="target === 'server'">
            <el-input v-model="url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('palybook')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('palybook')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('palybook')">리셋</el-button>
        <el-button @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
    <modal :show.sync="modals.isShow"
           footerClasses="justify-content-center"
           type="notice"
           modalClasses="modal-lg">
      <h5 slot="header" class="modal-title">Target 등록</h5>
      <template>
        <organization :component-type="this.componentType"></organization>
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
        this.palybook.uuid = this.$route.params.uuid;
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
                this.$store.dispatch("task/createUser", this.task);
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
        componentType : "modal",
        modals: {
          isShow: false,
        },
        type: '',     // edit:수정 , new:추가
        readonly: true,  // 수정화면에서 읽기전용필드 설정용
        palybook: {
          uuid: '',
          name: '',
          contents: '',
        },
        tags: [
          {name: 'Tag 1', type: 'info'},
          {name: 'Tag 2', type: 'info'},
          {name: 'Tag 3', type: 'info'},
          {name: 'Tag 4', type: 'info'},
          {name: 'Tag 5', type: 'info'},
          {name: 'Tag 11', type: 'info'},
          {name: 'Tag 21', type: 'info'},
          {name: 'Tag 31', type: 'info'},
          {name: 'Tag 41', type: 'info'},
          {name: 'Tag 51', type: 'info'}
        ],
        depts: [
          {name: '지인소프트', code: 'zeinsoft'},
        ],
        users: [
          {name: '홍길동', code: '1234'},
        ],
        sensors: [
        ],
        tasks: [],
        selectedTask: null,
        argument: '',
        target: 'server',
        url: '',
        rules: {
          name: [
            {required: true, message: '이름을 입력하세요.', trigger: 'change'}
          ]
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
