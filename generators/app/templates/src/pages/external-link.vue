<template>
  <div class="page-external-link">
    <img :src="externalLinkbg" alt="404" class="img-404" />
    <div class="right">
      <h1 class="status-code">Opps</h1>
      <h3 class="description">点击菜单后在新打开的浏览器页面查看内容</h3>
    </div>
  </div>
</template>

<script>
export default {
  title: '外部链接',
  name: 'ExternalLink',
  data() {
    return {
      externalLinkbg: require('@/assets/images/external-link-bg.svg'),
    }
  },
  methods: {
    jumpTo() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.page-external-link {
  width: 1042px;
  margin: 100px auto;
  display: flex;

  .img-404 {
    width: 438px;
    min-height: 300px;
    flex: 0 0 438px;
  }

  .right {
    flex: 1;
    margin-left: 100px;
    line-height: 1;
    padding-top: 130px;

    .status-code {
      color: #434e59;
      font-size: 73px;
    }

    .description {
      color: #a7a8ac;
      font-size: 24px;
      margin-top: 24px;
      white-space: nowrap;
    }

    .row {
      margin-top: 20px;
    }
  }
}
</style>
