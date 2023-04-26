/**
 * Access Control
 * 权限控制插件
 *  - 插件: `$ac`
 *  - 指令: `v-access`
 *
 * @author leiyin
 */
import Vue, { nextTick } from 'vue'
import { isPrettyObject } from '@/utils'
import { DEFAULT_BTN } from '@/const/platform'

class AccessControl {
  constructor() {
    this.btnAccessList = [] // 允许的按钮权限列表
  }

  // 获取当前页面路由path
  _getRoutePath() {
    const fullPath = location.hash.substr(1)
    let [routePath] = fullPath.split('?')
    // 匹配动态路由,正则匹配路径后面的数字替换为id
    routePath = routePath.replace(/\/[0-9]*$/, '/_id')
    return routePath
  }

  // this.$ac.access 直接调用是否拥有按钮权限方法,返回true,false
  access(accessCode) {
    return this.btnAccessList.findIndex((i) => i === accessCode) > -1
  }

  // el-data-table操作拦按钮权限功能
  operationAccess(list) {
    const routePath = this._getRoutePath()

    return list.filter((item) => {
      const accessCode = `${routePath}_${item.permiss || item.label}`
      return this.btnAccessList.findIndex((i) => i === accessCode) > -1
    })
  }

  // 捕捉按钮dom列表来控制权限
  buttonListAccess(buttons) {
    const routePath = this._getRoutePath()
    // 循环从大到小删除dom
    for (let i = buttons.length - 1; i > -1; i--) {
      const btn = buttons[i]
      const btnText = btn.innerText.trim()
      // 获取按钮唯一标示:${当前页面路径}_${按钮文本内容}
      const path = `${routePath}_${btnText}`
      // 获取当前按钮父级dom
      const parentNode = btn.parentNode
      // 判断是否允许访问,并且过滤掉table自带折叠搜索按钮
      if (
        !(this.btnAccessList.includes(path) || DEFAULT_BTN.includes(btnText))
      ) {
        parentNode && parentNode.removeChild(btn)
      }
    }
  }

  // 当前元素来控制权限
  buttonAccess(btn, path) {
    const routePath = this._getRoutePath()
    // 获取当前按钮父级dom
    const parentNode = btn.parentNode
    const accessCode = `${routePath}_${path}`
    // 判断是否允许访问
    if (!this.btnAccessList.includes(accessCode)) {
      parentNode && parentNode.removeChild(btn)
    }
  }
}

/**
 * inject plugin
 */
export default async function (ctx, inject) {
  const { app, store } = ctx
  const ac = new AccessControl()

  // 初始化按钮权限
  ac.init = async () => {
    // 按钮权限规则，路由路径_按钮名字
    ac.btnAccessList = store.state.btnList.map(
      ({ urlPrefix, component }) => `${urlPrefix}_${component}`
    )
  }
  // 注入依赖
  inject('ac', ac)

  // 根据不同修饰符调用权限方法
  const modifierMethod = {
    table: async (el) => {
      // 等datatable dom加载完毕
      await nextTick()
      const headerContainer = el.getElementsByClassName('sp-btn-right')[0] // 获取头部按钮区域dom
      const buttons = []
      if (headerContainer) {
        const headerBtn = headerContainer.getElementsByTagName('button') // 获取头部按钮
        buttons.push(...headerBtn)
      }
      app.$ac.buttonListAccess(buttons)
    },
    dom: (el) => {
      const buttons = el.getElementsByTagName('button') // 获取头部按钮
      app.$ac.buttonListAccess(buttons)
    },
    btn: (el, value) => {
      app.$ac.buttonAccess(el, value)
    },
  }
  /**
   * 权限指令
   *
   * v-access.btn="path" 针对当前按钮无权限则移除
   * v-access.table 针对tablelist组件header按钮无权限则移除
   * v-access.dom 针对dom组件获取dom下所有button按钮无权限则移除
   *
   */
  Vue.directive('access', {
    inserted(el, { value, modifiers }) {
      if (!isPrettyObject(modifiers)) {
        return
      }
      const [method] = Object.keys(modifiers)
      modifierMethod[method] && modifierMethod[method](el, value)
    },
    update(el, { value, modifiers }) {
      if (!isPrettyObject(modifiers)) {
        return
      }
      const [method] = Object.keys(modifiers)
      modifierMethod[method] && modifierMethod[method](el, value)
    },
  })
}
