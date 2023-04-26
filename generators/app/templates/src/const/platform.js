// 接口地址
export const API_SERVER = process.env.API_SERVER

// 是否是生产环境
export const isProduction = process.env.NODE_ENV === 'production'

// 登录后跳转地址
export const INDEX_PATH = '/home'

// 不需要判断权限的路径
export const NO_PERMISSION_PATH = ['/login', '/404', '/redirect']

// 不需要缓存的页面路径
export const NO_CACHE_PATH = [
  '/login',
  '/404',
  '/redirect',
  '/pdf-preview',
  '/screen',
  '/auth-message',
]

// 动态路由需要更改标签名称的页面
export const EDIT_PATH = [
  '/craft/process-period/edit/_id',
]

// 需要设置标签名称的页面，根据路由参数pageType的值来动态设置
export const TYPE_TO_NAME = {
  add: '新增',
  edit: '编辑',
  view: '查看',
}

// 系统默认按钮,用于按钮权限过滤
export const DEFAULT_BTN = ['筛选', '查询', '重置']
