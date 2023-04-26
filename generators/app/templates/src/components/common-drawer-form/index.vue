<template>
  <div class="c-drawer-form">
    <common-drawer
      :title="title"
      :type="type"
      :visible.sync="dialogVisible"
      :confirm="handleConfirm"
    >
      <el-form-renderer
        ref="formRender"
        label-position="left"
        label-width="120px"
        isFull
        :content="content"
      >
      </el-form-renderer>
    </common-drawer>
  </div>
</template>

<script>
import CommonDrawer from '../common-drawer'

export default {
  name: 'CommonDrawerForm',
  components: {
    CommonDrawer,
  },
  props: {
    content: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: 'confirm',
    },
    // 弹窗显示头
    title: {
      type: String,
      default: '',
    },
    // 点击取消触发的事件
    onCancel: {
      type: Function,
      default: null,
    },
    // 点击确定触发的事件
    onConfirm: {
      type: Function,
      default: null,
    },
    // 是否显示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: this.visible,
    }
  },
  watch: {
    visible: {
      immediate: false,
      handler(newVal) {
        if (this.dialogVisible !== this.visible) {
          this.dialogVisible = this.visible
        }
        if (!this.visible) {
          this.$refs.formRender.resetFields()
        }
      },
    },
    dialogVisible: {
      immediate: false,
      handler(newVal) {
        this.$emit('update:visible', newVal)
      },
    },
  },
  methods: {
    // 点击取消
    handleCancel(val) {
      // 清空内容
      this.onCancel && this.onCancel(val)
    },
    // 点击确认
    async handleConfirm() {
      // 表单校验
      const valid = await this.$refs.formRender.validate()

      // 校验失败或者onConfirm不存在直接返回
      if (!valid || !this.onConfirm) {
        return valid
      }
      // 获取表单值
      const formData = this.$refs.formRender.getFormValue()
      return this.onConfirm(formData)
    },
    // 更新form里面的内容
    updateForm(val) {
      this.$nextTick(() => {
        this.$refs.formRender.updateForm(val || {})
      })
    },
    // 设置之前不存在的 options 时需要重新设置响应式更新
    setOptions(key, val) {
      this.$nextTick(() => {
        this.$refs.formRender.setOptions(key, val)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.c-drawer-form {
  :deep(.el-form-item__label) {
    white-space: normal;
    line-height: 20px;
    padding: 6px 12px 0 0;
  }
}
</style>
