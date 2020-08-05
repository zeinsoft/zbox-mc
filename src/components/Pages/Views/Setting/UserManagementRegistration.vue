<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="account" :rules="rules" ref="account" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="idLabel" prop="adminId">
            <el-input v-model="account.adminId" :readonly="readonly" />
          </el-form-item>
          <el-form-item label="비밀번호 변경" v-if="readonly">
            <el-switch v-model="changePassword"></el-switch>
          </el-form-item>
          <el-form-item label="비밀번호" prop="password" v-if="changePassword || type === 'new'">
            <el-input  show-password v-model="account.password"></el-input>
          </el-form-item>
          <el-form-item label="비밀번호 확인" prop="passwordRetry" v-if="changePassword || type === 'new'">
            <el-input  show-password v-model="account.passwordRetry"></el-input>
          </el-form-item>
          <el-form-item label="이름" prop="adminName">
            <el-input v-model="account.adminName"></el-input>
          </el-form-item>
          <el-form-item label="상태" v-if="readonly && !this.myInfo">
            <el-select v-model="account.status">
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
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('account')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('account')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('account')">리셋</el-button>
        <el-button v-if="!this.myInfo" @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {Select, DatePicker, Form, FormItem, Button, Option, Input, Row, Col, Table, TableColumn, Switch} from 'element-ui';
  import AdminProxy from "../../../../proxies/AdminProxy";

  Vue.use(Table);
  Vue.use(TableColumn);

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
    },
    created: function () {
      if(this.$route.params.adminId !== undefined) {
        this.type = "edit";
        this.account.adminId = this.$route.params.adminId;
        if(this.$route.query.myInfo !== undefined) this.myInfo = this.$route.query.myInfo;
        this.$store.dispatch('common/setMenuTitle', "사용자수정");
        this.readonly = true;

        new AdminProxy()
          .find(this.account.adminId)
          .then((response) => {
            this.account = response.admin;
          })
      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "사용자등록");
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
                this.account.status = "OK";
                this.$store.dispatch("admin/createUser", this.account);
              }
            } else {
              if(confirm("수정하시겠습니까?")) {
                this.account.regDate = null;
                new AdminProxy()
                  .update(this.account.userId, this.account)
                  .then((response) => {
                    if(response.header.returnCode === "OK") {
                      if(this.myInfo) {
                        alert("수정되었습니다.");
                      } else {
                        Vue.router.push({
                          name: 'User'
                        });
                      }
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
    },
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '' || value.length < 4) {
          callback(new Error('비밀번호를 4자리 이상 입력하세요.'));
        } else {
          if (this.account.passwordRetry !== '') {
            this.$refs.account.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '' || value.length < 4) {
          callback(new Error('비밀번호를 4자리 이상 입력하세요.'));
        } else if (value !== this.account.password) {
          callback(new Error('비밀번호가 같아야 합니다.'));
        } else {
          callback();
        }
      };
      let validateId = (rule, value, callback) => {
        if(this.type === "new") {
          if (value === '' || value.length < 4) {
            callback(new Error('아이디를 4자리 이상 입력하세요.'));
          } else {
            new AdminProxy()
              .find(value)
              .then((response) => {
                if (response.header.returnCode === "DUPLICATE_USER_ID") {
                  callback();
                } else {
                  callback(new Error('이미 사용중인 ' + this.idLabel + '입니다. 다른 ' + this.idLabel + '를 입력하세요.'));
                }
              });
          }
        } else {
          callback();
        }
      };
      return {
        myInfo: false,
        type: '',     // edit:수정 , new:추가
        readonly: false,  // 수정화면에서 읽기전용필드 설정용
        changePassword: false,  // 수정화면에서 비밀번호 수정여부
        idLabel: "아이디",
        account: {
          adminId: '',
          adminName: '',
          password: '',
          passwordRetry: '',
          status: '',
        },
        rules: {
          adminName: [
            { required: true, message: '이름을 입력하세요.', trigger: 'change' }
          ],
          adminId: [
            { required: true, validator: validateId, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          passwordRetry: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },

  }
</script>

<style scoped>

</style>
