<template>
  <div :style="{ flex: `0 0 ${asideWidth}` }" class="aside">
    <div class="logo">
      <img v-if="!isCollapse" src="@/assets/images/logo.png" alt="" class="image" />
      <img v-else src="@/assets/images/logo-small.png" alt="" class="image-sm" />
    </div>
    <el-menu
      v-loading="loadingMenu"
      :default-active="curMenu"
      class="aside-menu"
      :router="false"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      :style="{ width: menuWidth }"
      @select="handleSelect"
    >
      <div v-for="(item, index) in menuList" :key="index">
        <el-submenu v-if="item.children" :index="item.path">
          <template v-if="item.children" slot="title">
            <img
              v-if="currentPath != item.path"
              class="side-icon"
              :src="pathIcon[item.path] ? pathIcon[item.path].icon : ''"
            />
            <img
              v-else
              class="side-icon"
              :src="pathIcon[item.path] ? pathIcon[item.path].iconCheck : ''"
            />
            <span>{{ item.name }} </span>
          </template>
          <div v-for="(subItem, subIndex) in item.children" :key="subIndex">
            <el-submenu v-if="subItem.children" :index="subItem.path">
              <span slot="title">{{ subItem.name }}</span>
              <el-menu-item v-for="(t, i) in subItem.children" :key="i" :index="t.path">
                {{ t.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!subItem.children" :index="subItem.path">
              {{ subItem.name }}
            </el-menu-item>
          </div>
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.path">
          <img
            v-if="currentPath != item.path"
            class="side-icon"
            :src="pathIcon[item.path] ? pathIcon[item.path].icon : ''"
          />
          <img
            v-else
            class="side-icon"
            :src="pathIcon[item.path] ? pathIcon[item.path].iconCheck : ''"
          />
          <span slot="title">{{ item.name }} </span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PATH_ICON from '@/const/paths-icon'

export default {
  data() {
    return {
      loadingMenu: false,
      curMenu: '/',
      pathIcon: PATH_ICON,
    }
  },
  computed: {
    ...mapState(['menuList', 'menuData', 'isCollapse']),
    routePath() {
      return this.$route.path
    },
    // 当前一级路由地址
    currentPath() {
      return `/${this.routePath.split('/')[1]}`
    },
    // 获取当前菜单
    currentMenu() {
      const dataItem = this.menuList.find((item) => item.path === this.currentPath)
      return dataItem
    },
    // 是否展示二级子菜单
    showSubmenu() {
      if (!this.currentMenu) {
        return
      }
      return !!this.currentMenu.children && !this.isCollapse
    },
    // 侧边栏菜单容器宽度
    asideWidth() {
      // 展示二级子菜单
      if (this.showSubmenu) {
        return '186px'
      }
      return this.menuWidth
    },
    // 菜单宽度
    menuWidth() {
      return this.isCollapse ? '65px' : '186px'
    },
    // 当前访问页面是否在菜单栏上, 控制图标的显示
    isSidebarMenu() {
      const dataItem = this.menuData.find((item) => item.path === this.routePath)
      return dataItem
    },
  },
  watch: {
    isCollapse(val) {
      this.setActiveMenu()
    },
    '$route.path': {
      immediate: true,
      handler() {
        this.setActiveMenu()
      },
    },
  },
  methods: {
    // 路由切换
    handleSelect(path) {
      if (!path) {
        return
      }
      // 获取当前菜单数据
      const childMenus = this.findChildMenu(this.menuList, path)
      this.$router.push(childMenus.path)
    },
    // 设置默认菜单选中
    setActiveMenu() {
      this.curMenu = this.$route.path
    },
    // 递归查找子级
    findChildMenu(arr, path) {
      let dataItem = ''
      arr.forEach((item) => {
        if (item.path === path) {
          dataItem = item
        } else if (item.children) {
          const childItem = this.findChildMenu(item.children, path)
          if (childItem) {
            dataItem = childItem
          }
        }
      })
      return dataItem
    },
  },
}
</script>

<style lang="less" scoped>
@import '~assets/var';

.aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #00142e;
  flex-grow: 0;

  .logo {
    position: relative;
    background: @theme;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
    }

    .image {
      width: 150px;
      margin: 15px auto;
      color: #fff;
      line-height: 44px;
      display: block;
    }

    .image-sm {
      width: 50px;
      margin: 16px auto;
      display: block;
    }
  }
}

.el-menu--collapse {
  :deep(.el-submenu__title) {
    span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }

    .el-icon-arrow-right {
      display: none;
    }
  }
}

.aside-menu {
  flex: 1;
  overflow-y: auto;
  border-right: 0;
  padding-top: 4px;
  background-color: @theme;

  .side-icon {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }

  .el-menu-item {
    color: rgba(255, 255, 255, 0.65);
    min-width: 65px;
    font-weight: 500;

    &:hover,
    &:focus {
      background-color: @theme;
    }

    &.is-active {
      color: #fff;
    }
  }

  :deep(.el-submenu) {
    .el-submenu__title {
      color: rgba(255, 255, 255, 0.65);
      font-weight: 500;

      &:hover,
      &:focus {
        background-color: @theme;

        span {
          color: white;
        }
      }
    }

    .el-menu {
      background-color: #000a17;

      .el-menu-item {
        height: 40px;
        line-height: 40px;
        margin: 4px 8px 8px 8px;
        border-radius: 4px;

        &:hover,
        &:focus {
          background-color: #000a17;
          color: white;
        }

        &.is-active {
          background: linear-gradient(90deg, #006fff 0%, #002aa9 100%);
          color: #fff;
        }
      }
    }
  }
}

.foot-btn {
  padding: 10px 0;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  background-color: @theme;

  .foot-in {
    height: 44px;
    background-color: #093862;
    border-radius: 4px;
    margin: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding: 0 10px;
    cursor: pointer;

    .icon-wms {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    .foot-flex {
      flex: 1;
    }

    .sub-title {
      font-size: 12px;
      font-weight: 400;
      color: #999;
    }

    .el-icon-right {
      font-size: 18px;
    }
  }
}
</style>
