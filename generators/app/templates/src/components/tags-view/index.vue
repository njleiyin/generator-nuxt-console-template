<template>
  <div v-if="visitedViews.length" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <nuxt-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isOneTag" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </nuxt-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-show="!isOneTag" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li v-show="!isOneTag" @click="closeOthersTags">关闭其他</li>
      <!-- TODO：待完善，没有默认不能关闭的页面 -->
      <!-- <li @click="closeAllTags(selectedTag)">关闭全部</li> -->
    </ul>
  </div>
</template>

<script>
import ScrollPane from './scroll-pane'
import ImportPages from './importPages'
import { EDIT_PATH, TYPE_TO_NAME } from '@/const/platform'

export default {
  components: {
    ScrollPane,
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      shouldClosePath: '',
      importPages: ImportPages, // 所有页面对象
    }
  },
  computed: {
    visitedViews() {
      return Object.values(this.$store.state.tagsView.visitedViews)
    },
    isOneTag() {
      return this.visitedViews.length === 1
    },
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    '$route.path'(val) {
      const routePath = val && val.replace(/\/[0-9]*$/, '/_id')
      const current = this.visitedViews.find((view) => view.path === routePath)
      this.$store.dispatch('tagsView/updateCurrentTag', current)
    },
  },
  mounted() {
    this.addTags(location)
    this.addListenerUrl()
  },
  methods: {
    addListenerUrl() {
      // 重写replaceState方法
      history.replaceState = this.bindEvent('replaceState')
      window.addEventListener('replaceState', (e) => {
        this.addTags(e.target.location)
      })
      // 重写pushState方法
      history.pushState = this.bindEvent('pushState')
      window.addEventListener('pushState', (e) => {
        this.addTags(e.target.location)
      })
      // 监听浏览器前进后退
      window.addEventListener('popstate', (e) => {
        this.addTags(e.target.location)
      })
    },
    // 注册自定义事件
    bindEvent(type) {
      const orig = history[type]
      return function () {
        const registEvent = orig.apply(this, arguments)
        const e = new Event(type)
        e.arguments = arguments
        window.dispatchEvent(e)
        return registEvent
      }
    },
    addTags(location) {
      const fullPath = location.hash.substr(1)
      const [path, query] = fullPath.split('?')

      let currentPath = `${path}`

      // 过滤掉重定向
      if (currentPath === '/redirect') {
        return
      }

      // 动态路由id
      const _id = currentPath.match(/\/[0-9]*$/)
      // 匹配动态路由,正则匹配路径后面的数字替换为id
      currentPath = currentPath.replace(/\/[0-9]*$/, '/_id')

      // 离开当前窗口不保存tag标签
      if (this.shouldClosePath && this.shouldClosePath !== currentPath) {
        this.$store.dispatch('tagsView/delView', { path: this.shouldClosePath })
        this.shouldClosePath = ''
      }
      // 获取页面组件对象的key
      const pageKey = currentPath.substring(1) // 去掉#
      // 兼容页面组件名称为index
      const pageKeyIndex = `${pageKey}/index`

      const { title, name } = this.importPages[pageKey] || this.importPages[pageKeyIndex] || {}

      const newRoute = {
        title,
        name,
      }

      // 当前窗口是否需要离开关闭
      if (newRoute.shouldClose) {
        this.shouldClosePath = currentPath
      }
      // 未找到配置路由组件名
      if (!newRoute.title) {
        newRoute.title = 'no-name'
      }

      // 当前路由是否为编辑页面,当操作为新增时，替换name
      if (EDIT_PATH.includes(currentPath) && _id && _id[0] !== '/0') {
        newRoute.title = newRoute.title.replace('新增', '编辑')
      }
      // 根据pageType参数类型,替换标签
      if (EDIT_PATH.includes(currentPath) && query) {
        const matchObj = query.match(/pageType=(add|edit|view)/)
        if (matchObj) {
          newRoute.title = `${TYPE_TO_NAME[matchObj[1]]}${newRoute.title.substring(2)}`
        }
      }
      // 未找到配置路由
      if (!newRoute.path) {
        newRoute.path = currentPath
      }
      // 保存fullPath用于页面跳转
      newRoute.fullPath = fullPath
      this.$store.dispatch('tagsView/addView', newRoute)
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect',
            query: {
              path: fullPath,
            },
          })
        })
      })
    },
    handleScroll() {
      this.closeMenu()
    },
    isAffix(tag) {
      return false
      // return tag.meta && tag.meta.affix
    },
    isActive(route) {
      let routePath = this.$route.path
      // 匹配动态路由替换
      routePath = routePath.replace(/\/[0-9]*$/, '/_id')
      return route.path === routePath
    },
    closeSelectedTag(view) {
      // TODO: 不能删除最后一个
      if (this.isOneTag) {
        return
      }

      this.$store.dispatch('tagsView/delView', view).then(({ e }) => {
        const lastVisitedView = this.visitedViews[this.visitedViews.length - 1]
        // 关闭当前打开窗口，返回views列表最后一个页面
        if (this.isActive(view)) {
          this.$router.push(lastVisitedView.fullPath)
        }
      })
    },
    closeOthersTags() {
      const { fullPath } = this.selectedTag
      this.$router.push(fullPath)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag)
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        // if (this.affixTags.some(tag => tag.path === view.path)) {
        //   return
        // }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = 20
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
  },
}
</script>
<style lang="less" scoped>
@import '~assets/var';

.tags-view-container {
  width: 100%;
  background: #fff;
  position: relative;
  z-index: 20;

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.45);
      background: #f2f3f6;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      border-radius: 4px 4px 0 0;

      &.active {
        color: #006aff;
        font-weight: bold;
      }

      /deep/.el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &::before {
          transform: scale(1);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
