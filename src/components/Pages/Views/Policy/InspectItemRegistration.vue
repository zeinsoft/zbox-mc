<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="inspectItem" :rules="rules" ref="inspectItem" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="점검항목ID" prop="inspectItemId">
            <el-input v-model="inspectItem.inspectItemId" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="점검항목명" prop="itemName">
            <el-input v-model="inspectItem.itemName" />
          </el-form-item>
          <el-form-item label="점검항목설명" prop="itemComment">
            <el-input v-model="inspectItem.itemComment" />
          </el-form-item>
          <el-form-item label="가중치" prop="weight">
            <el-input max="10" min="1" type="number" v-model="inspectItem.weight" />
          </el-form-item>
          <el-form-item label="사용여부">
            <el-switch v-model="inspectItem.useFlag" />
          </el-form-item>
          <el-form-item label="점수반영">
            <el-switch v-model="inspectItem.useScore" />
          </el-form-item>
          <el-form-item label="수정버튼">
            <el-switch v-model="inspectItem.showCorrectButton" />
          </el-form-item>
          <el-form-item label="강제적용">
            <el-switch v-model="inspectItem.forceApply" />
          </el-form-item>
          <el-form-item label="메시지" prop="message">
            <el-input v-model="inspectItem.message" />
          </el-form-item>
          <el-form-item label="템플릿값" prop="param">
            <el-input type="textarea"
                      :rows="10"
                      v-model="inspectItem.param" />
          </el-form-item>
          <el-form-item label="스크립트종류" prop="scriptType">
            <el-select v-model="inspectItem.scriptType">
              <el-option
                label="없음"
                value=""></el-option>
              <el-option
                label="bash"
                value="bash"></el-option>
              <el-option
                label="sh"
                value="sh"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="스크립트" prop="scriptText">
            <el-input type="textarea"
                      :rows="10"
                      v-model="inspectItem.scriptText" />
          </el-form-item>
          <el-form-item label="카테고리" prop="categoryId">
            <el-select v-model="inspectItem.categoryId">
              <el-option
                v-for="item in this.$store.state.category.categories"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="원인" prop="itemCause">
            <el-input v-model="inspectItem.itemCause" />
          </el-form-item>
          <el-form-item label="수정방법" prop="itemCorrect">
            <el-input v-model="inspectItem.itemCorrect" />
          </el-form-item>
          <el-form-item label="조회" prop="itemFound">
            <el-input v-model="inspectItem.itemFound" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('inspectItem')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('inspectItem')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('inspectItem')">리셋</el-button>
        <el-button @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {
    Select,
    DatePicker,
    Form,
    FormItem,
    Button,
    Input,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Option,
  } from 'element-ui';
  import InspectItemsProxy from "@/proxies/InspectItemsProxy";

  Vue.use(Table);
  Vue.use(TableColumn);

  export default {
    name: "InspectItemRegistration",
    components: {
      [DatePicker.name]: DatePicker,
      elSelect: Select,
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elInput: Input,
      elRow: Row,
      elCol: Col,
      elSwitch: Switch,
      elOption: Option,
    },
    created: function () {
      this.$store.dispatch('category/findAll');
      if (this.$route.params.inspectItemId !== undefined) {
        this.inspectItem.inspectItemId = this.$route.params.inspectItemId;
        this.type = "edit";
        this.$store.dispatch('common/setMenuTitle', "점검항목수정");
        this.readonly = true;
        new InspectItemsProxy()
          .find(this.inspectItem.inspectItemId)
          .then((response) => {
            this.inspectItem = response.inspectItem;
          })
      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "점검항목등록");
      }
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.type === "new") {
              if (confirm("등록하시겠습니까?")) {
                this.$store.dispatch('inspectItem/createInspectItem', this.inspectItem);
              }
            } else {
              if (confirm("수정하시겠습니까?")) {
                this.$store.dispatch('inspectItem/updateInspectItem', this.inspectItem);
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
      let validateWeight = (rule, value, callback) => {
        if (value < 0 || value > 10) {
          callback(new Error('가중치는 1에서 10사이 숫자로 입력해주세요.'));
        } else {
          callback();
        }
      };
      return {
        newItem: false,
        type: 'new',     // edit:수정 , new:추가
        readonly: false,  // 수정화면에서 읽기전용필드 설정용
        inspectItem: {
          inspectItemId: '',
          classId: 'gooroom',
          itemName: '',
          itemComment: '',
          weight: 10,
          useFlag: true,
          useScore: true,
          showCorrectButton: true,
          forceApply: false,
          message: '',
          param: '',
          categoryId: '',
          itemCause: '',
          itemCorrect: '',
          itemFound: '',
          scriptText: '',
          scriptType: '',
        },
        rules: {
          categoryId: [
            { required: true, message: '카테고리를 선택하세요.', trigger: 'change' }
          ],
          inspectItemId: [
            {required: true, message: '점검항목 아이디를 입력하세요.', trigger: 'blur'}
          ],
          itemName: [
            {required: true, message: '점검항목명을 입력하세요.', trigger: 'blur'}
          ],
          weight: [
            {required: true, message: '가중치를 입력하세요.', trigger: 'blur'},
            { required: true, validator: validateWeight, trigger: 'blur' }
          ],
        }
      }
    },

  }
</script>

<style scoped>

</style>
