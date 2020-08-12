<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      :load="loadNode"
      lazy
      ref="deptTree"
      node-key="code"
      :default-expanded-keys="defaultDeptCode"
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
  import {Modal} from 'src/components/UIComponents'
  import {Tree} from 'element-ui';
  import DeptProxy from '@/proxies/DeptProxy';

  export default {
    components: {
      Modal,
      elTree: Tree
    },
    name: "DeptTree",
    props: {
      defaultDeptCode:null,
    },
    data() {
      return {
        data: [{name: '전체', code: 'all', uuid: 'all'}],
        defaultProps: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        this.$emit('handleNodeClick', data)
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{name: '전체', code: 'all', uuid: 'all'}]);
        }
        new DeptProxy({filter_ : JSON.stringify({'parent_code':node.data.code})})
          .deptListByParentDeptCode()
          .then((response) => {
            resolve(response.result_obj);
          })
      }
    }
  }
</script>

<style scoped>
  .el-tree {
    position: relative;
    cursor: default;
    background: #FFF;
    color: #606266;
    height: 400px;
    overflow: auto;
  }
</style>
