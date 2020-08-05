<template>
  <el-form class="form-horizontal" label-width="120px">
    <el-row>
      <el-col :span="24">
        <el-form-item label="날짜" label-width="60px" prop="openDate">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="날짜 선택"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="name === 'Score'" label="대상" label-width="60px" prop="openDate">
          <el-radio v-model="form.target" label="dept">부서현황</el-radio>
          <el-radio v-model="form.target" label="user">사용자현황</el-radio>
        </el-form-item>
        <el-form-item label="조직도" label-width="60px" prop="openDate">
          <el-checkbox v-model="form.include">하위부서포함</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="text-right">
        <el-button size="small" type="success" @click.prevent="search()">검색</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import Vue from 'vue'
  import {DatePicker, Form, FormItem, Button, Row, Col, Radio, Checkbox, } from 'element-ui'
  import VueMoment from 'vue-moment'
  import moment from 'moment-timezone'

  Vue.use(VueMoment, {
    moment,
  })

  export default {
    name: "StatusSearchForm",
    components: {
      [DatePicker.name]: DatePicker,
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elRow: Row,
      elCol: Col,
      elRadio: Radio,
      elCheckbox: Checkbox,
    },
    created: function () {

    },
    props: {
      form: null,
      name: null,
    },
    methods: {
      search() {
        this.$emit('search');
      },
      getFormData() {
        return this.form;
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0px;
  }
</style>
