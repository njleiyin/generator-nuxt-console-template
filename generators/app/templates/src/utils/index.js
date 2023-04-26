import qs from 'qs'
import dayjs from 'dayjs'

import { API_SERVER, isProduction } from '@/const/platform'

let throttleTimer = null // 设置节流定时器标识
/**
 * 时间戳格式化
 * @param {*} time
 * @param {*} format
 */
export function formatDate(time, format = 'YYYY-MM-DD') {
  if (!time) {
    return ''
  }
  const t = typeof time === 'string' ? new Date(time.replace(/\-/g, '/')) : time
  return dayjs(t).format(format)
}

/**
 * 时间戳格式化 年月日 时分秒
 * @param {*} time
 * @param {*} format
 */
export function formatDateTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) {
    return ''
  }
  const t = typeof time === 'string' ? new Date(time.replace(/\-/g, '/')) : time
  return dayjs(t).format(format)
}

/**
 * 检测非空数组
 * @param {*} any
 *
 * @retun {Boolean}
 */
export function isPretty(any) {
  return Boolean(Array.isArray(any) && any.length)
}

/**
 * 检测数字类型
 * @param {*} any
 *
 * @return {Boolean}
 */
export function isNumber(any) {
  return typeof any === 'number' && !isNaN(any)
}

/**
 * 判断非{}对象
 * @param Object
 * @return Boolean
 * */
export function isPrettyObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length !== 0
}

/**
 * 生成数据导出参数
 *
 * 1. 按当前查询条件
 * 2. 移除值为null的条件
 * @param {*} customQuery 额外参数
 * @param {*} tableComponents table组件
 */
export function getExportParams(customQuery, tableComponents) {
  const params = {}

  try {
    const { searchForm } = tableComponents
    const formData = searchForm.getFormValue()
    Object.assign(formData, customQuery)
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '' || value === null) {
        return
      }

      // 参数为数组特殊处理，用,连接。
      if (value instanceof Array) {
        if (value.length !== 0) {
          params[key] = value.join(',')
        }
      } else {
        params[key] = value
      }
    })
  } catch (e) {}
  return params
}

/**
 * 获取当天结束时间23:59:59
 */
export function getOverTime() {
  return new Date(
    new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
  ).getTime()
}

/**
 * 获取当前时间的前一天的时间
 */
export function getLastOneDayTime() {
  return dayjs(new Date().getTime() - 24 * 60 * 60 * 1000 - 1)
}

/**
 * 获取当前时间前半年的时间
 */
export function getLastSixMonthTime() {
  return dayjs(new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
}

/**
 * @param phone 手机号
 * @return 手机号中间四位替换为****
 * */
export function phoneEncryption(phone) {
  if (!phone) {
    return ''
  }
  const reg = /(\d{3})\d{4}(\d{4})/
  return phone.replace(reg, '$1****$2')
}

/**
 * 对象检测
 *
 * @param {*} any
 * @returns {Boolean}
 */
export function isObject(any) {
  return any != null && typeof any === 'object' && Array.isArray(any) === false
}

/**
 * 空检测
 *
 * @param {*} any
 * @returns {Boolean}
 */
export function isFalsey(value) {
  return ['', undefined, null].includes(value) || (Array.isArray(value) && value.length === 0)
}

/**
 * Location utils
 */
export const Locations = {
  /**
   * 获取当前地址queryString
   *
   * @returns {*} payload
   */
  getPayload() {
    return qs.parse(location.search.substring(1))
  },

  /**
   * 设置当前地址queryString和hash路由
   *
   * @param {*} payload
   * @param {*|Boolean|String} [hash=true]
   *
   * @returns {String}
   */
  setPayload(payload, hash = true) {
    let url
    const query = qs.stringify(payload)
    if (query) {
      url = Locations.getPlainUrl() + `?${query}`
    } else {
      url = Locations.getPlainUrl()
    }
    if (typeof hash === 'string') {
      url += hash
    } else if (isObject(hash)) {
      // 设置hash路由
      url += '#' + hash.path
      // 设置hash路由参数
      hash.query && (url += '?' + qs.stringify(hash.query))
    } else if (hash === true) {
      url += location.hash
    }
    return url
  },

  /**
   * 获取当前地址，不带任何参数
   *
   * @returns {String}
   */
  getPlainUrl() {
    return location.origin + location.pathname
  },
}

/**
 * 密码校验
 *
 * 1.密码可以是纯数字或纯字母，例如：20150411、ababcdcd是有效密码
 * 2.不允许密码的所有位一致，例如：111111是非法密码
 * 3.不允许密码只包含连续数字或字母，例如： abcdefg、1234567、876543是非法密码
 * 4.密码中的字母区分大小写，例如：ABCDABCD、abcdabcd是不同的密码
 *
 * @param strText
 * @returns {Boolean}
 */
export function checkPassword(strText) {
  if (!strText) {
    return
  }
  const str1 = '01234567890' // 正序连续数字
  const str2 = '09876543210' // 倒序连续数字
  const str3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // 正序连续大写字母
  const str4 = str3.split('').reverse().join('') // 倒序序连续大写字母
  const str5 = str3.toLocaleLowerCase() // 正序连续小写字母
  const str6 = str5.split('').reverse().join('') // 倒序连续小写字母

  // 检查是否为连续的字符
  if (
    str1.includes(strText) ||
    str2.includes(strText) ||
    str3.includes(strText) ||
    str4.includes(strText) ||
    str5.includes(strText) ||
    str6.includes(strText)
  ) {
    return true
  }
  // 检查是否为连续的字符
  return Array.from(new Set(strText.split(''))).length === 1
}

/**
 * 数组转化为tree
 *
 * @param {Array} arr 数据
 * @param {Object} params 配置项
 * @param {String} params.sort 按sort这个键值排序
 * @param {String} params.parentId 父级id过滤
 * @param {String} params.pid 父级id集合，符号,分割
 * @returns {Array}
 */
export function listFormatTree(arr, params) {
  if (!Array.isArray(arr)) {
    return arr
  }
  const { sort, parentId, pid } = params
  const tree = arr
    .filter((item) => `${item.parentId}` === `${parentId}`) // 用字符串处理。数字会有精度缺失问题
    .map((item) => {
      const obj = {
        ...item,
      }
      if (pid) {
        obj.parentIds = `${pid},${item.id}` // 保存父级id集合，符号,分割。后端需要这个字段，方便查询
      }
      const childParam = {
        sort,
        parentId: item.id,
        pid: obj.parentIds || '',
      }
      const children = listFormatTree(arr, childParam)
      if (children.length) {
        obj.children = children
      }
      return obj
    })
  // 排序
  if (sort) {
    return tree.sort(function (a, b) {
      return +a[sort] - +b[sort]
    })
  }

  return tree
}

/**
 * 格式化树状结构数据
 *
 * @param {Array} orignData 数据
 * @param {Object} params 配置项
 * @param {String} params.label 按orignData，label取值设置label
 * @param {String} params.value 按orignData，value取值设置value
 * @param {String} params.children 按orignData，children取值设置children
 * @returns {Array}
 */
export function treeFormatData(orignData, params) {
  const { label = 'label', value = 'value', children = 'children' } = params

  if (!orignData) {
    return []
  }

  orignData.forEach((item) => {
    item.label = item[label]
    item.value = item[value]

    const childrenData = treeFormatData(item[children], params)

    if (childrenData && childrenData.length) {
      item.children = childrenData
    }
  })
  return orignData
}

/**
 * 给函数添加防抖
 *
 * @param {Function} func 函数
 * @param {Object} delay 防抖时间，单位ms
 * @returns {Function}
 */

export function debounce(func, delay) {
  // 设置定时器标识
  let timer
  // 难点返回事件绑定函数
  return function () {
    // func指定this
    const context = this
    // func参数
    const args = arguments
    // 先清除定时器
    clearTimeout(timer)
    // 设置定时器
    timer = setTimeout(() => {
      // 调用函数
      func.apply(context, args)
    }, delay)
  }
}

/**
 * 给函数添加节流
 *
 * @param {Function} func 函数
 * @param {Object} delay 节流时间，单位ms
 * @returns {Function}
 */

export function throttle(func, delay) {
  return function () {
    // func指定this
    const context = this
    // func参数
    const args = arguments

    // 定时器存在则直接return
    if (throttleTimer) {
      return
    }
    // 设置定时器
    throttleTimer = setTimeout(() => {
      // 调用函数
      func.apply(context, args)
      // 调用完成后清除定时器
      clearTimeout(throttleTimer)
      throttleTimer = null
    }, delay)
  }
}

/**
 * 表格增加一行添加唯一标识
 *
 * @param {Function} func 函数
 * @param {Object} delay 唯一标识
 * @returns {String}
 */

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 按环境获取域名
 *
 * @param {Boolean} [ignoreDevMode = true] 是否忽略本地开发环境
 * @returns {String}
 */
export function getDomainByEnv(ignoreDevMode = true) {
  // 忽略本地开发环境
  if (ignoreDevMode && !isProduction) {
    return ''
  }

  // 默认当前域名及协议
  const domain = API_SERVER || location.origin

  return domain
}

/**
 * 根据文件流导出文件进行下载
 *
 * @param {*} data 文件流数据
 * @param {*} options 参数 { type: 文件格式 , name: 文件名字 }
 * @returns {Boolean} success
 */
export function downloadByArraybuffer(data, options = {}) {
  if (!data) {
    return false
  }
  const { type = 'application/vnd.ms-excel', name } = options
  const blob = new Blob([data], { type })

  // 获取heads中的filename文件名
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = name
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
  return true
}

/**
 * 复制字符串到粘贴板
 *
 * @param {String} str 需要复制的文本
 * @returns {Boolean} success
 */
export function copyText(str) {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', str)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  return true
}
