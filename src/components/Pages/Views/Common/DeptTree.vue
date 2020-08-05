<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      :load="loadNode"
      lazy
      ref="deptTree"
      node-key="deptCode"
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
        data: [{deptName: '전체', deptCode: 'all'}],
        defaultProps: {
          label: 'deptName',
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
          return resolve([{deptName: '전체', deptCode: 'all'}]);
        }
        new DeptProxy()
          .deptListByParentDeptCode(node.data.deptCode)
          .then((response) => {
            resolve(response.depts);
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
