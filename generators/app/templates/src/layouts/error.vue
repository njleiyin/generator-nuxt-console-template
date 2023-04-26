<template>
  <div class="page-error">
    <div class="right">
      <h1 class="status-code">
        {{ error.statusCode }}
      </h1>
      <h3 v-if="error.statusCode === 404" class="description">
        抱歉，你访问的页面不存在
      </h3>
      <h3 v-else class="description">{{ error.message }}</h3>
      <div class="row">
        <el-button type="primary" @click="jumpTo">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { INDEX_PATH } from '@/const/platform'
export default {
  props: {
    error: {
      type: Object,
      default: () => {
        return { statusCode: 404 }
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    jumpTo() {
      this.$router.push(INDEX_PATH)
    },
  },
}
</script>

<style lang="less" scoped>
.page-error {
  width: 750px;
  margin: 100px auto;
  display: flex;

  .img-404 {
    width: 408px;
  }

  .right {
    margin-left: 100px;
    line-height: 1;
    padding-top: 60px;

    .status-code {
      color: #434e59;
      font-size: 73px;
    }

    .description {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      margin-top: 24px;
    }

    .row {
      margin-top: 16px;
    }
  }
}
</style>
