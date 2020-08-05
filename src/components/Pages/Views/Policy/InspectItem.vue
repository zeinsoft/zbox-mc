<template>
  <div>
    <card>
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" editable @edit="handleTabsEdit">
            <el-tab-pane
              v-for="(item, index) in $store.state.category.categories"
              :key="item.categoryId"
              :label="item.categoryName"
              :name="item.categoryId">
              <el-form v-if="activeName == item.categoryId" class="form-horizontal" :model="category" ref="category" label-width="120px">
                <el-row :gutter="24">
                  <el-col :span="18">
                    <el-form-item label="카테고리명" prop="categoryName">
                      <el-input v-model="category.categoryName" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="primary" @click="submitForm()">수정</el-button>
                  </el-col>
                </el-row>
              </el-form>
              <inspect-item-list-component v-on:detailRow="detailRow" v-if="activeName == item.categoryId" :category-id="item.categoryId"></inspect-item-list-component>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="pull-right">
            <el-button type="primary" icon="el-icon-plus" v-on:click="register">항목 등록</el-button>
          </div>
        </el-col>
      </el-row>
    </card>
    <modal :show.sync="modals.isShow"
           footerClasses="justify-content-center"
           type="notice">
      <h5 slot="header" class="modal-title">카테고리 등록</h5>
      <template>
        <el-form class="form-horizontal" :model="formData" :rules="rules" ref="categoryForm" label-width="120px">
          <el-form-item label="카테고리ID" prop="categoryId">
            <el-input v-model="formData.categoryId"></el-input>
          </el-form-item>
          <el-form-item label="카테고리명" prop="categoryName">
            <el-input v-model="formData.categoryName"></el-input>
          </el-form-item>
          <div class="pull-right mt-2">
            <el-button type="primary" icon="el-icon-check" @click="submit('categoryForm')">저장</el-button>
            <el-button icon="el-icon-close" v-on:click="showModal(false)">취소</el-button>
          </div>
        </el-form>
      </template>
    </modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Form, FormItem, Button, Input, TabPane, Tabs} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import InspectItemListComponent from "./InspectItemListComponent";
  import {Modal} from 'src/components/UIComponents'
  import CategoryProxy from "../../../../proxies/CategoryProxy";
  import { mapState } from 'vuex';

  export default {
    name: "InspectItem",
    components: {
      InspectItemListComponent,
      elCard: Card,
      elTabPane: TabPane,
      elTabs: Tabs,
      elButton : Button,
      elForm : Form,
      elFormItem : FormItem,
      elInput : Input,
      Modal,
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "점검항목");
      this.$store.dispatch('category/findAll');
    },
    methods: {
      detailRow(row) {
        Vue.router.push({name: 'InspectItemRegistration', params: {inspectItemId : row.inspectItemId}})
      },
      getInspectItemsByCategoryId(categoryId) {
        let param = {
          categoryId : categoryId
        };
      },
      search() {

      },
      handleClick(tab, event) {
        this.getCategory(tab.name);
        this.getInspectItemsByCategoryId(tab.name);
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          this.showModal(true);
        }
        if (action === 'remove') {
          alert("작업중");
        }
      },
      register() {
        Vue.router.push({name: 'InspectItemRegistration'})
      },
      showModal(isShow) {
          this.$refs['categoryForm'].resetFields();
          this.modals.isShow = isShow;
      },
      getCategory(categoryId) {
        new CategoryProxy()
        .find(categoryId)
        .then((response) => {
          this.category = response.category;
        })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            new CategoryProxy()
              .create(this.formData)
              .then((response) => {
                if (response.header.returnCode === "OK") {
                  this.$store.dispatch('category/findAll');
                  this.activeName = this.formData.categoryId;
                  this.showModal(false);
                } else {
                  alert(response.header.resultMessages);
                }
              })
          } else {
            return false;
          }
        });
      },
      submitForm() {
        if(this.category.categoryName === "") {
          alert("카테고리명을 입력하세요.");
        } else {
          new CategoryProxy()
          .update(this.category.categoryId, this.category)
          .then((response) => {
            if (response.header.returnCode === "OK") {
              this.$store.dispatch('category/findAll');
            } else {
              alert(response.header.resultMessages);
            }
          })
        }
      },
    },
    watch: {
      categoriesAlias(newValue, oldValue) {
        if(newValue.length > 0) {
          if(this.$route.params.categoryId !== undefined) {
            this.activeName = this.$route.params.categoryId;
          } else {
            this.activeName = newValue[0].categoryId;
          }
          this.getCategory(this.activeName);
          this.getInspectItemsByCategoryId(newValue[0].categoryId);
        }
      },
    },
    computed: {
      ...mapState({
        categoriesAlias: state => state.category.categories,
      }),
    },
    data() {
      return {
        activeName: null,
        modals: {
          isShow: false,
        },
        formData: {
          categoryName: null,
          categoryId: null,
        },
        category: {},
        rules: {
          categoryName: [
            {required: true, message: '카테고리명을 입력하세요.', trigger: 'blur'}
          ],
          categoryId: [
            {required: true, message: '카테고리ID을 입력하세요.', trigger: 'blur'}
          ],
        }
      }
    }
  }
</script>

<style scoped>

</style>
