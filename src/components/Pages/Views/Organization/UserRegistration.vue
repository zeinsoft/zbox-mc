<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <card>
          <dept-tree v-on:handleNodeClick="handleNodeClick" :default-dept-code="defaultDeptCode"></dept-tree>
        </card>
      </el-col>
      <el-col :span="18">
        <card class="w-100">
          <el-form class="form-horizontal" :model="user" :rules="rules" ref="user" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="사번" prop="code">
                  <el-input v-model="user.code" :readonly="readonly" />
                </el-form-item>
                <el-form-item label="이름" prop="name">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="card-footer text-right">
              <el-button type="primary" v-if="type === 'new'" @click="submitForm('user')">등록</el-button>
              <el-button type="primary" v-if="type === 'edit'" @click="submitForm('user')">수정</el-button>
              <el-button v-if="type === 'new'" @click.prevent="resetForm('user')">리셋</el-button>
              <el-button @click.prevent="historyBack">취소</el-button>
            </div>
          </el-form>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Form, FormItem, Button, Option, Input, Row, Col, Table, TableColumn} from 'element-ui';
  import UserProxy from "../../../../proxies/UserProxy";
  import DeptTree from "../Common/DeptTree";
  import MongoProxy from "../../../../proxies/MongoProxy";

  Vue.use(Table);
  Vue.use(TableColumn);

  export default {
    name: "UserRegistration",
    components: {
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elOption: Option,
      elInput: Input,
      elRow: Row,
      elCol: Col,
      DeptTree,
    },
    created: function () {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "직원등록");
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(confirm("등록하시겠습니까?")) {
                this.user.status = "OK";
                // this.user.uuid = this.user.code;
                new UserProxy()
                  .create(this.user)
                  .then((response) => {
                    new MongoProxy()
                    .create({
                      left_table: "users",
                      left_uuid: response.rest_input.uuid,
                      right_table: "depts",
                      right_uuid: this.user.deptCode
                    })
                    .then((response) => {
                      Vue.router.push({
                        name: 'Organization'
                      });
                    })
                  });
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
      handleNodeClick(data) {
        this.user.deptCode = data.uuid;
        this.user.deptName = data.name;
      },
    },
    data() {
      let validateId = (rule, value, callback) => {
        if(this.type === "new") {
          if (value === '' || value.length < 1) {
            callback(new Error('사번을 입력하세요.'));
          } else {
            new UserProxy()
              .find(value)
              .then((response) => {
                console.log(response);
                callback(new Error('이미 사용중인 사번입니다.'));
              })
              .catch((e) => {
                console.log('Request failed...', e);
                callback();
              });
          }
        } else {
          callback();
        }
      };
      return {
        defaultDeptCode: ["all"],
        type: '',     // edit:수정 , new:추가
        readonly: false,  // 수정화면에서 읽기전용필드 설정용
        user: {
          uuid: '',
          code: '',
          name: '',
          desc: '',
          deptCode: 'all',
          deptName: '',
          status: 'OK',
          use_flag: true,
          depts: [],
          sensors: [],
        },
        relation: {
          left_table: "",
          left_uuid: "",
          right_table: "",
          right_uuid: ""
        },
        rules: {
          name: [
            { required: true, message: '이름을 입력하세요.', trigger: 'change' }
          ],
          code: [
            { required: true, validator: validateId, trigger: 'blur' }
          ],
        }
      }
    },

  }
</script>

<style scoped>

</style>
