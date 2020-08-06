<template>
  <card class="w-100">

    <el-form class="form-horizontal" :model="script" ref="script" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="이름" prop="name">
            <el-input v-model="script.name"></el-input>
          </el-form-item>
          <el-form-item label="설명" prop="desc">
            <el-input v-model="script.desc" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="버전" prop="revision">
            <el-input v-model="script.revision"></el-input>
          </el-form-item>
          <!--<el-form-item label="arguments" prop="arguments">
            <el-input v-model="script.arguments"></el-input>
          </el-form-item>-->
          <el-form-item label="engine" prop="engine">
            <el-input v-model="script.engine"></el-input>
          </el-form-item>
          <el-form-item label="contents" prop="contents">
            <el-input v-model="script.contents" type="textarea" :rows="10"></el-input>
          </el-form-item>
          <el-form-item label="hash" prop="hash">
            <el-input v-model="script.hash" :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="생성일" prop="create_ts">
            <el-input v-model="script.create_ts_text" :readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="수정일" prop="update_ts">
            <el-input v-model="script.update_ts_text" :readonly="readonly"></el-input>
          </el-form-item>

        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('script')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('script')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('script')">리셋</el-button>
        <el-button v-if="!this.myInfo" @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {Select, DatePicker, Form, FormItem, Button, Option, Input, Row, Col, Table, TableColumn, Switch} from 'element-ui';
  import TaskProxy from "../../../../proxies/TaskProxy";
  import ScriptProxy from "../../../../proxies/ScriptProxy";
  import moment from 'moment-timezone'
  import VueMoment from "vue-moment";

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
    },
    created: function () {
      if(this.$route.params.scriptUuid !== undefined) {
        this.type = "edit";
        this.script.uuid = this.$route.params.scriptUuid;
        this.$store.dispatch('common/setMenuTitle', "Script 수정");

        new ScriptProxy()
          .find(this.script.uuid)
          .then((response) => {
            this.script = response.result_obj;
            this.script.create_ts_text = moment(this.script.create_ts).format('YYYY-MM-DD');
            this.script.update_ts_text = moment(this.script.update_ts).format('YYYY-MM-DD');
          })

      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "Script 등록");
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
                this.$store.dispatch("script/createUser", this.script);
              }
            } else {
              if(confirm("수정하시겠습니까?")) {
                new ScriptProxy()
                  .update(this.script.uuid, this.script)
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
        myInfo: false,
        type: '',     // edit:수정 , new:추가
        readonly: true,  // 수정화면에서 읽기전용필드 설정용
        changePassword: false,  // 수정화면에서 비밀번호 수정여부
        idLabel: "아이디",
        script: {
          uuid: '',
          name: '',
          desc: '',
          revision: '',
          arguments: '',
          engine: '',
          contents: '',
          hash: '',
          create_ts_text: '',
          update_ts_text: '',
          prods: [],
          tasks: [],
        }
        /*rules: {
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
        }*/
      }
    },

  }
</script>

<style scoped>

</style>
