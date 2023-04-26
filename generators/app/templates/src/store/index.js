import { MessageBox } from 'element-ui'
import { INDEX_PATH } from '@/const/platform'
import {
  getToken,
  setToken,
  getTenantId,
  setTenantId,
  setUserId,
  setUserPassword,
  setUserInfo,
  removeToken,
  removeUserId,
  removeTenantId,
  removeUserPassword,
  removeUserInfo,
} from '@/utils/auth-storage'
import { listFormatTree } from '@/utils'

const PARENT_ID = 1 // 默认顶层父级菜单id

export const state = () => ({
  tenantId: getTenantId(),
  user: {},
  token: getToken(),
  menuData: [], // 菜单数据
  menuList: [], // 菜单数据tree
  btnList: [], // 按钮数据
  menuLoading: false, // 菜单数据加载完成标识
  isCollapse: false, // 是否折叠
})

export const getters = {
  // 是否登录
  hasLogin(state) {
    return Boolean(state.token && state.user.id)
  },
  // 菜单路径集合
  menuPath(state) {
    const paths = state.menuData.map((item) => item.path)
    return paths
  },
  // 当前租户名字
  currentTenant(state) {
    const tenant = state.tenantList.find((item) => item.tenantId === state.tenantId)
    return tenant ? tenant.tenantName : ''
  },
}

export const mutations = {
  login(state, { token, tenantId, id, password, userInfo }) {
    // 更新state
    state.token = token
    state.tenantId = tenantId
    // 更新localstorage
    setToken(token)
    setUserId(id)
    setTenantId(tenantId)
    setUserPassword(password)
    setUserInfo(userInfo)
  },
  logout(state) {
    // 重置相关state
    state.token = null
    state.tenantId = ''
    state.user = {}
    state.menuList = []
    state.tenantList = []
    // 移除localstorage
    removeToken()
    removeUserId()
    removeTenantId()
    removeUserPassword()
    removeUserInfo()
  },
  update(state, payload) {
    Object.keys(payload).forEach((k) => {
      state[k] = payload[k]
    })
  },
}

export const actions = {
  /**
   * 登录
   *
   * @param {*} payload
   * @returns {String|null} redirect
   */
  async login({ commit, dispatch }, payload) {
    const data = {
      token: 'bearToken',
      id: 1,
      tenantCode: 1,
      username: 'leiyin',
    }

    const { token, id, tenantCode, username } = data

    // 更新token信息
    commit('login', {
      token,
      id,
      password: payload.password,
      userInfo: {
        username,
        tenantCode,
      },
    })

    commit('update', { menuList: [] }) // 清空菜单信息
    // 登录时，置空所有tag
    dispatch('tagsView/delAllViews', null)

    // 获取基本数据
    const isFetch = await dispatch('fetchUserInfo', id)

    // 登录成功后，重定向页面
    if (isFetch) {
      dispatch('redirectPage')
    }
  },
  // 拉取登录用户信息
  async fetchUserInfo({ commit, dispatch }, payload) {
    try {
      commit('update', {
        user: {
          username: 'admin',
          nickName: 'admin',
          id: 2,
        },
      })
      // 获取基本数据
      await Promise.all([
        dispatch('getUserMenuTree'), // 获取菜单树
      ])
      await this.$ac.init() // 初始化按钮权限数据
      return true
    } catch (e) {
      return false
    }
  },
  // 获取菜单
  async getUserMenuTree({ commit }) {
    try {
      const data = [
        {
          path: '/home',
          name: '首页',
          appType: 'MENU',
          parentId: 1,
          id: 2,
        },
      ]
      // 过滤菜单数据
      const menuData = data.filter((item) => item.appType === 'MENU')
      // 过滤按钮数据
      const btnList = data.filter((item) => item.appType === 'BUTTON')

      const menuList = listFormatTree(menuData, {
        sort: 'ordered',
        parentId: PARENT_ID,
      })

      commit('update', {
        menuData,
        menuList,
        btnList,
        menuLoading: true,
      })

      // 没有菜单权限给个提示
      if (!data.length) {
        MessageBox.confirm('请联系管理员分配权限', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
        }).finally(() => {
          commit('logout')
          this.$router.replace({
            path: '/login',
          })
        })
      }
    } catch (err) {}
  },
  // 重定向页面
  redirectPage() {
    const redirectUrl = INDEX_PATH
    this.$router.replace(redirectUrl)
  },
}
