<template>
  <div class="container">
    <side-bar></side-bar>
    <el-container class="el-container">
      <el-header height="48px">
        <headers></headers>
      </el-header>
      <el-main class="nuxt-main">
        <div class="nuxt-body">
          <!-- 生产环境打开keep-alive，开发环境暂时关闭，否则会影响热更新 -->
          <nuxt v-if="isRouterAlive" keep-alive :keepAliveProps="{ include: cachedViews }"></nuxt>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Headers from '@/components/base-header'
import SideBar from '@/components/side-bar/'

export default {
  components: {
    Headers,
    SideBar,
  },
  // 用于刷新当前页面
  provide() {
    return {
      reload: this.reload,
    }
  },
  middleware: 'auth',
  data() {
    return {
      isRouterAlive: true,
    }
  },
  computed: {
    ...mapState('tagsView', ['cachedViews']),
  },
  created() {
    this.reload() // 点击浏览器刷新按钮，由于异步获取cachedViews，组件已创建成功，但cachedViews还未有值。重新加载容器
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
  },
}
</script>

<style lang="less">
@import '~assets/var';

body {
  overflow-y: hidden;
}

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

#__nuxt {
  .el-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .el-header {
    background-color: #fff;
    padding: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 20;
  }

  .nuxt-main {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .nuxt-body {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }

  .tags-view {
    border-bottom: 1px solid #e4e8f3;
    padding: 5px 10px;
    box-shadow: 0 2px 6px #00000026;

    .tags-row {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      border-radius: 4px;
    }
  }

  .notific {
    position: absolute;
  }
}
</style>
