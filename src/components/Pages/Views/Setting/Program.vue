<template>
  <div>
  <card>
    <el-table id="UserListTable"
              style="width: 100%; margin-bottom: 10px;"
              :data="programs"
              :header-cell-style="tableRowStyle"
              ref="UserListTable">
      <el-table-column
        prop="version"
        label="버전">
      </el-table-column>
      <el-table-column
        label="파일명"
        prop="fileName">
      </el-table-column>
      <el-table-column
        label="등록일"
        prop="regDate">
        <template slot-scope="props">
          {{ props.row.regDate | moment('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="최신버전여부"
        prop="useFlag">
      </el-table-column>
      <el-table-column
        label="최신버전적용">
        <template slot-scope="props">
          <el-button type="success" icon="el-icon-check" @click="handleEdit(props.$index, props.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <p-pagination class="pull-right"
                      v-on:input="changePage"
                      v-model="pagination.currentPage"
                      :per-page="parseInt(pagination.perPage)"
                      :total="total">
        </p-pagination>
      </el-col>
    </el-row>
  </card>
  <card class="w-100">
    <el-form class="form-horizontal" :model="program" ref="program" label-width="120px">
      <el-row :gutter="10">
        <el-col :span="11" >
          <el-form-item label="버전" prop="version">
            <el-input v-model="program.version" />
          </el-form-item>
        </el-col>
        <el-col :span="11" style="margin-top: 5px">
          <div class="pull-left">
            <el-upload
              class="upload-demo"
              ref="regProgram"
              action="/api/programs"
              :headers="header"
              :data="getFormParam"
              :on-remove="handleRemove"
              :limit="1"
              :on-success="handleSuccess"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">프로그램파일 선택</el-button>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="2"class="text-right">
          <el-button type="primary" @click="submitForm()">등록</el-button>
        </el-col>
      </el-row>
    </el-form>
  </card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Form, FormItem, Button, Table, TableColumn, Input, Row, Col, Upload} from 'element-ui'
  import {Card} from 'src/components/UIComponents'
  import VueMoment from 'vue-moment'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import SensorProgramProxy from "../../../../proxies/SensorProgramProxy";
  import * as types from "../../../../store/modules/organization/mutation-types";

  Vue.use(VueMoment)
  Vue.use(Upload)

  export default {
    name: "Program",
    components: {
      elCard: Card,
      elForm: Form,
      elFormItem: FormItem,
      elButton: Button,
      elInput: Input,
      elRow: Row,
      elCol: Col,
      elTable : Table,
      elTableColumn : TableColumn,
      PPagination,
    },
    created: function () {
      this.$store.dispatch('common/setMenuTitle', "센서 프로그램관리");
      this.changePage(1);
    },
    computed: {
      getFormParam: function () {
        return this.program;
      }
    },
    methods: {
      tableRowStyle() {
        return this.$store.state.common.tableHeaderCellStyle;
      },
      submitForm() {
        if (confirm("저장하시겠습니까?")) {
          if(this.$refs["regProgram"].uploadFiles.length > 0){
            this.$refs["regProgram"].submit();
          }
        }
      },
      handleRemove(file, fileList) {
        this.$refs["regProgram"].clearFiles();
      },
      handleSuccess(response, files, fileList) {
        if (response.header.returnCode === "OK") {
          this.$refs["regProgram"].clearFiles();
          this.changePage(1);
          alert("저장되었습니다.");
        } else {
          alert(response.header.resultMessages);
        }
      },
      changePage(page) {
        let param = {
          page: page,
          rows: this.pagination.perPage
        };
        new SensorProgramProxy(param)
          .all()
          .then((response) => {
            console.log(response);
            this.total = response.totalCnt;
            this.programs = response.programs;
          });

      },
      handleEdit(index, row) {
        new SensorProgramProxy()
        .update(row.programId, null)
          .then((response) => {
            if (response.header.returnCode === "OK") {
              this.changePage(1);
              alert("적용되었습니다.");
            } else {
              alert(response.header.resultMessages);
            }
          });
      },
    },
    data() {
      return {
        header: {
          Authorization:$cookies.get('admin_id_token')
        },
        program: {
          version: ""
        },
        total: 0,
        programs: [],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
        },
      }
    }
  }
</script>

<style scoped>

</style>
