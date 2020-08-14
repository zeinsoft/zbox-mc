<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="target" :rules="rules" ref="target" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="부서 선택">
            <el-row>
              <el-tag v-for="dept in target.depts" :key="dept.code" closable @close="handleClose(dept, 'dept')">
                {{dept.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" @click="addTarget()">부서 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="사용자 선택">
            <el-row>
              <el-tag v-for="user in target.users" :key="user.name" closable @close="handleClose(user, 'user')">
                {{user.name}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" @click="addTarget()">사용자 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="센서 선택">
            <el-row>
              <el-tag v-for="sensor in target.sensors" :key="sensor.agent_id" closable @close="handleClose(sensor, 'sensor')">
                {{sensor.agent_id}}
              </el-tag>
            </el-row>
            <el-row>
              <el-button type="primary" @click="addTarget()">센서 추가</el-button>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="이름" prop="name">
            <el-input v-model="target.name"></el-input>
          </el-form-item>
          <el-form-item label="내용" prop="desc">
            <el-input v-model="target.desc" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('target')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('target')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('target')">리셋</el-button>
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
    Form,
    FormItem,
    Button,
    Input,
    Row,
    Col,
    Table,
    TableColumn,
  } from 'element-ui';
  import TargetProxy from "../../../../proxies/TargetProxy";
  import Organization from "../Organization/Organization";

  Vue.use(Table);
  Vue.use(TableColumn);

  export default {
    name: "TargetView",
    components: {
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elInput: Input,
      elRow: Row,
      elCol: Col,
      elTag: Tag,
      Modal,
      Organization,
    },
    created: function () {
      if (this.$route.params.uuid !== undefined) {
        this.type = "edit";
        this.targetObject.uuid = this.$route.params.uuid;
        this.$store.dispatch('common/setMenuTitle', "Target 수정");

        new TargetProxy()
          .getTargetByUUID(this.targetObject.uuid, "depts")
          .then((response) => {
            this.target.depts = response.result_obj;
          });

        new TargetProxy()
          .getTargetByUUID(this.targetObject.uuid, "users")
          .then((response) => {
            this.target.users = response.result_obj;
          });

        new TargetProxy()
          .getTargetByUUID(this.targetObject.uuid, "sensors")
          .then((response) => {
            this.target.sensors = response.result_obj;
          });

        new TargetProxy()
          .find(this.targetObject.uuid)
          .then((response) => {
            console.log(response);
            this.targetObject = response.result_obj;
            this.target.name = this.targetObject.name;
            this.target.desc = this.targetObject.desc;
          });
      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "Target 등록");
      }
      let param = {};
      this.$store.dispatch('task/findAll', param);
    },
    methods: {
      handleClose(tag, type) {
        switch (type) {
          case "dept":
            this.target.depts.splice(this.target.depts.indexOf(tag), 1);
            break;
          case "user":
            this.target.users.splice(this.target.users.indexOf(tag), 1);
            break;
          case "sensor":
            this.target.sensors.splice(this.target.sensors.indexOf(tag), 1);
            break;
        }
        console.log(tag);
      },
      addTarget() {
        this.modals.isShow = true;
      },
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // target 설정
            this.targetObject.depts = [];
            this.target.depts.forEach(s => {
              this.targetObject.depts.push(s.code);
            });

            this.targetObject.users = [];
            this.target.users.forEach(u => {
              this.targetObject.users.push(u.code);
            });

            this.targetObject.sensors = [];
            this.target.sensors.forEach(s => {
              this.targetObject.sensors.push(s.uuid);
            });

            this.targetObject.name = this.target.name;
            this.targetObject.desc = this.target.desc;

            if (this.type === "new") {
              if (confirm("등록하시겠습니까?")) {
                console.log(JSON.stringify(this.targetObject));

                this.$store.dispatch("target/create", this.targetObject);
              }
            } else {
              if (confirm("수정하시겠습니까?")) {
                new TargetProxy()
                  .update(this.targetObject.uuid, this.targetObject)
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
        if (this.target.depts.length === 0) {
          this.target.depts.push(target);
        } else {
          let duplicateCount = 0;
          this.target.depts.forEach(s => {
            if (s.code === target.code) {
              duplicateCount++;
            }
          }, target.code);
          if (duplicateCount === 0) this.target.depts.push(target);
        }
      },
      /**
       * 사용자 선택
       */
      selectTargetUser(target) {
        if (this.target.users.length === 0) {
          this.target.users = target;
        } else {
          target.forEach(t => {
              let duplicateCount = 0;
              this.target.users.forEach(s => {
                if (s.code === t.code) {
                  duplicateCount++;
                }
              }, t.code);
              if (duplicateCount === 0) this.target.users.push(t);
            }
          )
        }
      },
      /**
       * 센서 선택
       * @param target
       */
      selectTargetSensor(target) {
        if (this.target.sensors.length === 0) {
          this.target.sensors = target;
        } else {
          target.forEach(t => {
              let duplicateCount = 0;
              this.target.sensors.forEach(s => {
                if (s.agent_id === t.agent_id) {
                  duplicateCount++;
                }
              }, t.agent_id);
              if (duplicateCount === 0) this.target.sensors.push(t);
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
        target: {
          name: '',
          desc: '',
          depts: [],
          users: [],
          sensors: []
        },
        targetObject: {
          uuid: '',
          name: '',
          desc: '',
          depts: [],
          users: [],
          sensors: []
        },
        rules: {
          name: [
            {required: true, message: '이름을 입력하세요.', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '내용을 입력하세요.', trigger: 'change'}
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
