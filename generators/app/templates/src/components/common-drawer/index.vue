<template>
  <el-drawer
    class="v-drawer common-dialog"
    :title="title"
    :visible.sync="show"
    :show-close="true"
    :wrapperClosable="false"
    :modal="false"
    :destroy-on-close="true"
    :close-on-press-escape="!loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="content">
      <slot v-if="show"></slot>
      <div class="dialog-footer">
        <slot name="footer"></slot>
        <template v-if="isConfirmType">
          <el-button
            plain
            icon="el-icon-close"
            size="medium"
            :loading="loading"
            @click="handleClose('cancel', 'cancelled')"
          >
            {{ cancelText }}
          </el-button>
          <el-button
            plain
            type="primary"
            size="medium"
            icon="el-icon-check"
            :loading="loading"
            @click="handleClose('confirm', 'confirmed')"
          >
            {{ confirmText }}
          </el-button>
        </template>
        <el-button
          v-else
          plain
          icon="el-icon-close"
          @click="handleClose('close', 'closed')"
        >
          {{ closeText }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
/**
 * @type {Object}
 * @description 弹窗类型
 */
const DialogTypes = {
  confirm: 'confirm',
  alert: 'alert',
}

/**
 * v-drawer
 *
 * 通用`el-drawer`弹窗
 *
 * Slots:
 * - `default` 内容
 * - `footer` 底部按钮栏
 *
 * Events:
 *  - `@canceled` 已取消
 *  - `@confirmed` 已确认
 *  - `@closed` 已关闭
 *
 * Callback(props):
 *  - `cancel` 取消前置回调
 *  - `confirm` 确认前置回调
 *
 */
export default {
  name: 'CommonDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // confirm: 取消前置异步回调，返回`false`取消操作
    cancel: {
      type: Function,
      default: null,
    },
    // confirm: 确认前置异步回调，返回`false`取消操作
    confirm: {
      type: Function,
      default: null,
    },
    // alert: 关闭前置异步回调，返回`false`取消操作
    close: {
      type: Function,
      default: null,
    },
    type: {
      type: String,
      default: 'confirm',
      validator: (value) => Object.values(DialogTypes).includes(value),
    },
    title: {
      type: String,
      default: '标题',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确认',
    },
    closeText: {
      type: String,
      default: '关闭',
    },
    footerBtns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    isConfirmType() {
      return this.type === DialogTypes.confirm
    },
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },

  deactivated() {
    this.show = false
  },

  methods: {
    async handleClose(type, event) {
      this.loading = true

      let shouldClose = true

      // 前置回调
      const handleCb = this[type]
      if (handleCb) {
        try {
          shouldClose = (await handleCb()) !== false
        } catch (e) {
          shouldClose = false
        }
      }

      // 关闭弹窗
      if (event && shouldClose) {
        this.show = false
        this.$emit(event)
      }

      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
:deep(.el-drawer) {
  &:focus {
    outline: none;
  }

  .el-drawer__header {
    margin-bottom: 20px;

    span {
      color: rgb(45, 48, 59);
      font-size: 16px;

      &:focus {
        outline: none;
      }
    }
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background: white;
  }

  .content {
    padding: 0 20px;
    height: calc(100vh - 130px);
    overflow: auto;
  }
}
</style>
