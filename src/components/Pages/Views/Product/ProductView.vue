<template>
  <card class="w-100">
    <el-form class="form-horizontal" :model="product" :rules="rules" ref="product" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="이름" prop="name">
            <el-input v-model="product.name"></el-input>
          </el-form-item>
          <el-form-item label="내용" prop="desc">
            <el-input v-model="product.desc" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="로그인URL" prop="agent_url">
            <el-input v-model="product.agent_url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="card-footer text-right">
        <el-button type="primary" v-if="type === 'new'" @click="submitForm('product')">등록</el-button>
        <el-button type="primary" v-if="type === 'edit'" @click="submitForm('product')">수정</el-button>
        <el-button v-if="type === 'new'" @click.prevent="resetForm('product')">리셋</el-button>
        <el-button @click.prevent="historyBack">취소</el-button>
      </div>
    </el-form>
  </card>
</template>

<script>
  import Vue from 'vue'
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
  import ProductProxy from "../../../../proxies/ProductProxy";

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
    },
    created: function () {
      if (this.$route.params.uuid !== undefined) {
        this.type = "edit";
        this.product.uuid = this.$route.params.uuid;
        this.$store.dispatch('common/setMenuTitle', "제품 수정");

        new ProductProxy()
        .find(this.product.uuid)
        .then((response) => {
          this.product = response.result_obj;
        });
      } else {
        this.type = "new";
        this.$store.dispatch('common/setMenuTitle', "제품 등록");
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
                console.log(JSON.stringify(this.targetObject));

                this.$store.dispatch("target/create", this.targetObject);
              }
            } else {
              if (confirm("수정하시겠습니까?")) {
                new ProductProxy()
                  .update(this.product.uuid, this.product)
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

        product: {
          uuid : '',
          name: '',
          desc: '',
          depts: [],
          admins: [],
          tasks: [],
          agent_url: '',
          key : '',
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
