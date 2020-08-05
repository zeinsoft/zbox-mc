<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="config" :rules="rules" ref="config" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="이름" prop="configName">
            <el-input v-model="config.configName"/>
          </el-form-item>
          <el-form-item label="아이디">
            <el-input v-model="config.configId" :readonly="true"/>
          </el-form-item>
          <el-form-item label="설명">
            <el-input
              type="textarea"
              :rows="5"
              v-model="config.description"/>
          </el-form-item>
          <el-form-item label="설정값" prop="scriptType">
            <el-select v-model="configValue.selectValue" v-if="comboList !== null" style="width: 100%;">
              <el-option
                v-for="item in comboList.list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="사용자지정" prop="etcValue" v-if="configValue.selectValue === 'etc'">
            <el-input v-model="etcValue" type="number" style="width: 100px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" @click="updateConfig('config')">수정</el-button>
        <el-button @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {
    Select,
    Form,
    FormItem,
    Button,
    Input,
    Row,
    Col,
    Option,
  } from 'element-ui';
  import {Card} from 'src/components/UIComponents'
  import ConfigProxy from "../../../../proxies/ConfigProxy";
  import AdminProxy from "../../../../proxies/AdminProxy";

  export default {
    name: "ManagementDetailSelectType",
    components: {
      elCard: Card,
      elSelect: Select,
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elInput: Input,
      elRow: Row,
      elCol: Col,
      elOption: Option,
    },
    created: function () {
      this.getConfig(this.$route.params.configId);
    },
    methods: {
      /**
       * 설정 조회
       * @param configId
       */
      getConfig(configId) {
        new ConfigProxy()
          .find(configId)
          .then((response) => {
            this.config = response.config;
            this.comboList = JSON.parse(this.config.comboList);
            this.findAllConfigValueById(this.config.configId, this.config.configTemplateId);
          })
      },
      /**
       * 설정값 조회
       * @param configId
       * @param configTemplateId
       */
      findAllConfigValueById(configId, configTemplateId) {
        new ConfigProxy()
          .findAllConfigValueById(configId, configTemplateId)
          .then((response) => {
            if (response.configValues.length > 0) {
              response.configValues[0].selectValue = response.configValues[0].selectValueObject.selectValue;
              this.configValue = response.configValues[0];
              if(this.configValue.selectValue === 'etc') {
                this.etcValue = this.configValue.selectValueObject.value;
              }
            }
          });
      },
      /**
       * 설정 변경
       * @param formName
       */
      updateConfig(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (confirm("수정하시겠습니까?")) {
              if (this.configValue.configValueId !== null) {
                this.config.configValue = this.configValue;
              } else {
                this.config.configValue = {
                  configTemplateId: this.config.configTemplateId,
                  configId: this.config.configId,
                };
              }
              this.config.configValue.selectValueObject = {
                selectValue: this.configValue.selectValue,
                value: this.configValue.selectValue === "etc" ? this.etcValue : this.configValue.selectValue,
              };
              this.config.configValue.display = this.getDisplay(this.configValue.selectValue);
              this.config.display = this.getDisplay(this.configValue.selectValue);
              this.$emit('updateConfig', this.config);
            }
          } else {
            return false;
          }
        });
      },
      /**
       * display 값 생성
       * @param selectValue
       * @returns {*}
       */
      getDisplay(selectValue) {
        let selectObject = this.getComboByValue(selectValue);
        console.log(selectObject);
        if(selectObject.value === 'etc') {
          return this.etcValue + "분";
        } else {
          return selectObject.label;
        }
      },
      /**
       * combo by value
       * @param value
       */
      getComboByValue(value) {
        let selectObject = null;
        this.comboList.list.forEach(s => {
          if (s.value === value) {
            selectObject = s;
          }
        }, value);
        return selectObject;
      },
      historyBack() {
        this.$emit('historyBack');
      },
    },
    data() {
      let validateValue = (rule, value, callback) => {
        if (this.configValue.selectValue === 'etc') {
          let selectObject = this.getComboByValue(this.configValue.selectValue);
          if(this.etcValue < parseInt(selectObject.min) || this.etcValue > parseInt(selectObject.max)) {
            callback(new Error('설정값을 정확하게 입력하세요.'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        etcValue : 0,
        comboList: null,
        config: {
          configTemplateId: null,
          configId: null,
          configName: null,
          categoryId: null,
          type: null,
          description: null,
          useFlag: null,
          comboList: null,
        },
        configValue: {
          configTemplateId: null,
          configId: null,
          configValueId: null,
          selectValue: "0",
          selectValueObject: null,
          display: null,
        },
        rules: {
          configName: [
            {required: true, message: '이름을 입력하세요.', trigger: 'blur'}
          ],
          etcValue: [
            { required: true, validator: validateValue, trigger: 'blur' }
          ],
        }
      }
    }
  }
</script>

<style scoped>

</style>
