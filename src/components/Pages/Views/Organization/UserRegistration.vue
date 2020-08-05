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
                <el-form-item label="사번" prop="userId">
                  <el-input v-model="user.userId" :readonly="readonly" />
                </el-form-item>
                <el-form-item label="이름" prop="userName">
                  <el-input v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item label="부서명" v-if="type === 'edit'">
                  <el-input  v-model="user.deptName" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="상태" v-if="readonly">
                  <el-select v-model="user.status">
                    <el-option
                      label="정상"
                      value="OK"></el-option>
                    <el-option
                      label="삭제"
                      value="REMOVE"></el-option>
                  </el-select>
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
  import {Select, DatePicker, Form, FormItem, Button, Option, Input, Row, Col, Table, TableColumn, Switch} from 'element-ui';
  import UserProxy from "../../../../proxies/UserProxy";
  import DeptTree from "../Common/DeptTree";
  import DeptProxy from "../../../../proxies/DeptProxy";

  Vue.use(Table);
  Vue.use(TableColumn);

  export default {
    name: "UserRegistration",
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
      DeptTree,
    },
    created: function () {
      if(this.$route.params.userId !== undefined) {
        this.type = "edit";
        this.user.userId = this.$route.params.userId;
        this.$store.dispatch('common/setMenuTitle', "직원수정");
        this.readonly = true;
        new UserProxy()
          .find(this.user.userId)
          .then((response) => {
            this.user = response.user;
            this.setDeptTree(this.user.deptCode);
          });
      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "직원등록");
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
                this.user.status = "OK";
                new UserProxy()
                  .create(this.user)
                  .then((response) => {
                    if(response.header.returnCode === "OK") {
                      Vue.router.push({
                        name: 'Organization'
                      });
                    } else {
                      alert(response.header.resultMessages);
                    }
                  });
              }
            } else {
              if(confirm("수정하시겠습니까?")) {
                this.user.regDate = null;
                this.user.removeDate = null;
                new UserProxy()
                  .update(this.user.userId, this.user)
                  .then((response) => {
                    if(response.header.returnCode === "OK") {
                        Vue.router.push({
                          name: 'Organization'
                        });
                    } else {
                      alert(response.header.resultMessages);
                    }

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
      handleNodeClick(data) {
        this.user.deptCode = data.deptCode;
        this.user.deptName = data.deptName;
      },
      setDeptTree(deptCode) {
        new DeptProxy()
          .getDeptPathList(deptCode)
          .then((response) => {
            let depts = [];
            response.depts.forEach(s => {
              depts.push(s);
            });
            this.defaultDeptCode = depts;
          });
      }
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
                if (response.header.returnCode === "DUPLICATE_USER_ID") {
                  callback();
                } else {
                  console.log(response);
                  callback(new Error('이미 사용중인 사번입니다.'));
                }
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
          userId: '',
          userName: '',
          deptCode: 'all',
          status: 'OK',
        },
        rules: {
          userName: [
            { required: true, message: '이름을 입력하세요.', trigger: 'change' }
          ],
          userId: [
            { required: true, validator: validateId, trigger: 'blur' }
          ],
        }
      }
    },

  }
</script>

<style scoped>

</style>
