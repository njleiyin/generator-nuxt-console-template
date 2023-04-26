const TENANT_ID = 'tenantId' // 租户id
const USER_TOKEN = 'userToken' // 键值
const USER_ID = 'userId' // 用户id
const TABLEB_SCENE = 'tablebScene' // table表格查询参数
const FILE_PATH = 'filePath' // 预览文件路径
const PASSWORD = 'password' // 用户编译后密码，用于切换租户时使用
const USER_INFO = 'userInfo' // 用户信息

/**
 * 获取token
 *
 * @returns {String|null} token
 */
export function getToken() {
  return localStorage.getItem(USER_TOKEN)
}

/**
 * 设置token
 *
 * @param {String} token
 * @returns {Boolean} success
 */
export function setToken(token) {
  localStorage.setItem(USER_TOKEN, token)
  return true
}

/**
 * 移除token
 *
 * @returns {Boolean} success
 */
export function removeToken() {
  localStorage.removeItem(USER_TOKEN)
  return true
}

/**
 * 获取tenantId
 *
 * @returns {String|null} tenantId
 */
export function getTenantId() {
  return localStorage.getItem(TENANT_ID)
}

/**
 * 设置tenantId
 *
 * @param {String} tenantId
 * @returns {Boolean} success
 */
export function setTenantId(tenantId) {
  localStorage.setItem(TENANT_ID, tenantId)
  return true
}

/**
 * 移除tenantId
 *
 * @returns {Boolean} success
 */
export function removeTenantId() {
  localStorage.removeItem(TENANT_ID)
  return true
}

/**
 * 获取userId
 *
 * @returns {String|null} userId
 */
export function getUserId() {
  return localStorage.getItem(USER_ID)
}

/**
 * 设置userId
 *
 * @param {String} userId
 * @returns {Boolean} success
 */
export function setUserId(userId) {
  localStorage.setItem(USER_ID, userId)
  return true
}

/**
 * 移除userId
 *
 * @returns {Boolean} success
 */
export function removeUserId() {
  localStorage.removeItem(USER_ID)
  return true
}

/**
 * 保存tablebScene
 *
 * @param {String} key
 * @param {Object} data
 * @returns {Boolean} success
 */
export function setTableScene(key, data) {
  const sceneData = localStorage.getItem(TABLEB_SCENE)
  const tablebScene = sceneData ? JSON.parse(sceneData) : {}
  tablebScene[key] = data
  localStorage.setItem(TABLEB_SCENE, JSON.stringify(tablebScene))
  return true
}

/**
 * 获取tablebScene，指定key的值
 *
 * @param {String} key
 * @returns {Object} obj
 */
export function getTableScene(key) {
  const sceneData = localStorage.getItem(TABLEB_SCENE)
  const tablebScene = sceneData ? JSON.parse(sceneData) : {}
  return tablebScene[key] || false
}

/**
 * 删除tablebScene，指定key的值
 *
 * @param {String} key
 * @returns {Object} obj
 */
export function delTableScene(key) {
  const sceneData = localStorage.getItem(TABLEB_SCENE)
  const tablebScene = sceneData ? JSON.parse(sceneData) : {}
  delete tablebScene[key]
  localStorage.setItem(TABLEB_SCENE, JSON.stringify(tablebScene))
  return true
}

/**
 * 移除tablebScene
 *
 * @returns {Boolean} success
 */
export function removeTableScene() {
  localStorage.removeItem(TABLEB_SCENE)
  return true
}

/**
 * 保存filePath
 *
 * @param {String} key
 * @param {Object} data
 * @returns {Boolean} success
 */
export function setFilePath(key, data) {
  const pathData = localStorage.getItem(FILE_PATH)
  const filePath = pathData ? JSON.parse(pathData) : {}
  filePath[key] = data
  localStorage.setItem(FILE_PATH, JSON.stringify(filePath))
  return true
}

/**
 * 获取filePath，指定key的值
 *
 * @param {String} key
 * @returns {Object} obj
 */
export function getFilePath(key) {
  const pathData = localStorage.getItem(FILE_PATH)
  const filePath = pathData ? JSON.parse(pathData) : {}
  return filePath[key] || false
}

/**
 * 获取密码
 *
 * @returns {String|null} password
 */
export function getUserPassword() {
  return localStorage.getItem(PASSWORD)
}

/**
 * 设置密码
 *
 * @param {String} password
 * @returns {Boolean} success
 */
export function setUserPassword(password) {
  localStorage.setItem(PASSWORD, password)
  return true
}

/**
 * 移除密码
 *
 * @returns {Boolean} success
 */
export function removeUserPassword() {
  localStorage.removeItem(PASSWORD)
  return true
}

/**
 * 设置用户信息
 *
 * @param {String} userInfo
 * @returns {Boolean} success
 */
export function setUserInfo(userInfo) {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
  return true
}

/**
 * 获取用户信息
 *
 * @param {String} key
 * @returns {Object} obj
 */
export function getUserInfo() {
  const userInfo = localStorage.getItem(USER_INFO)
  return userInfo ? JSON.parse(userInfo) : false
}

/**
 * 移除用户信息
 *
 * @returns {Boolean} success
 */
export function removeUserInfo() {
  localStorage.removeItem(USER_INFO)
  return true
}
