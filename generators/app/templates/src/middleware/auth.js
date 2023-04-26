import { getUserId } from '@/utils/auth-storage'

const userId = getUserId()

// 客户端鉴权
export default async function ({ store, redirect }) {
  if (process.env.NO_LOGIN > 0) {
    return
  }

  // 未登录则跳转登录
  if (!store.state.token) {
    return redirect('/login')
  }

  // 已更新用户相关数据
  if (store.getters.hasLogin) {
    return
  }

  // 拉取用户信息
  const success = await store.dispatch('fetchUserInfo', userId)

  // 获取失败，重新登录
  if (!success) {
    return redirect('/login')
  }
}
