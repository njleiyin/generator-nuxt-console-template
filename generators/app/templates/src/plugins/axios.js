import { Message } from 'element-ui'
import qs from 'qs'
import { getToken } from '@/utils/auth-storage'

// message实例
let errorMessageIntance = null

export default function ({ $axios, store, route, redirect }) {
  /**
   * 登录失效，退出登录
   */
  function logout() {
    store.commit('logout')
    if (route.path !== '/login') {
      redirect('/login')
    }
  }

  $axios.onRequest((config) => {
    // jwt 验证
    const token = getToken()

    if (token) {
      config.headers.common.Authorization = `${token}`
    }
    // 添加参数
    const [url, queryString] = config.url.split('?')

    const payload = {
      ...qs.parse(queryString),
      // tenantId: store.state.tenantId,
      _: +new Date(),
    }

    config.url = url + '?' + qs.stringify(payload)

    return config
  })

  $axios.onResponse((response) => {
    try {
      if (response.data.code === '803') {
        logout()
      }
    } catch (e) {
      // do nothing
    }
    return response
  })

  $axios.onError((error) => {
    try {
      const { status, data } = error.response

      /**
       * [单例] 使用message提示错误，避免与notification冲突
       */
      errorMessageIntance && errorMessageIntance.close()
      errorMessageIntance = Message.error(`[${status}]: ${data.msg || data.message || '请求失败'}`)

      // 登录失效拦截
      if (+status === 401 || data.code === '803') {
        logout()
      }
    } catch (e) {
      // do nothing
    }
  })
}
