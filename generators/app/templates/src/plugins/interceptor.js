/**
 * 全局路由拦截
 */
import { NO_PERMISSION_PATH, INDEX_PATH } from '@/const/platform'

export default function ({ app, store }) {
  /**
   * 前置拦截
   *
   */
  app.router.beforeEach((to, from, next) => {
    const menuLoading = store.state.menuLoading // 菜单加载完毕标识
    const menuPath = store.getters.menuPath // 菜单路径集合
    const path = to.path
    // 重定向首页
    if (path === '/') {
      next(INDEX_PATH)
    }
    // 判断是否有访问路由权限。todo暂时没加这个控制
    if (!menuPath.includes(path) && menuLoading && !NO_PERMISSION_PATH.includes(path)) {
      next()
      // next('/404')
    }
    next()
  })

  /**
   * 后置拦截
   *
   */
  app.router.afterEach(() => {})
}
