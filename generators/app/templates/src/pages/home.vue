<template>
  <el-data-table v-bind="tableConfigTask"></el-data-table>
</template>

<script>
export default {
  title: '首页',
  name: 'Home',
  data() {
    return {
      tableData: [
        {
          id: 1,
          equipmentName: '涂布',
          productName: '铝箔',
          productNorms: '7-24',
          planQuantity: '100',
          taskStartTime: '2023-04-23 10:00:20',
          taskEndTime: '2023-04-23 14:00:21',
        },
      ],
    }
  },
  computed: {
    tableConfigTask() {
      return {
        defaultData: this.tableData,
        columns: [
          {
            type: 'selection',
            fixed: 'left',
          },
          {
            label: '序号',
            type: 'index',
            prop: 'index',
          },
          {
            label: '设备',
            prop: 'equipmentName',
          },
          {
            label: '产品名称',
            prop: 'productName',
          },
          {
            label: '规格',
            prop: 'productNorms',
          },
          {
            label: '数量',
            prop: 'planQuantity',
          },

          {
            label: '计划开始时间',
            prop: 'taskStartTime',
          },
          {
            label: '计划结束时间',
            prop: 'taskEndTime',
          },
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'name',
            label: '设备',
            $el: {
              clearable: true,
              placeholder: '请输入',
            },
          },
          {
            $type: 'input',
            $id: 'productName',
            label: '产品名称',
            $el: {
              clearable: true,
              placeholder: '请输入',
            },
          },
        ],
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
