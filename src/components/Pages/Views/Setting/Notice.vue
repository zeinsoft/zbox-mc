<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="notice" ref="notice" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="제목" prop="adminId">
            <el-input v-model="notice.title" />
          </el-form-item>
          <el-form-item label="내용" prop="adminName">
            <el-input v-model="notice.content" type="textarea" :rows="10"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" @click="submitForm()">등록</el-button>
      </div>
    </el-form>
  </card>
</template>

<script>
  import Vue from 'vue'
  import {Form, FormItem, Button, Input, Row, Col} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import NoticeProxy from "../../../../proxies/NoticeProxy";

  Vue.use(VueMoment)

  export default {
    name: "Notice",
    components: {
      elCard: Card,
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elInput: Input,
      elRow: Row,
      elCol: Col,
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "공지설정");
    },
    methods: {
      submitForm() {
        new NoticeProxy()
          .create(this.notice)
          .then((response) => {
            console.log(response);
          });
      },
    },
    data() {
      return {
        notice: {
          title : "",
          content: ""
        },
      }
    }
  }
</script>

<style scoped>

</style>
