/**
 * 注册常用指令到全局
 */
import input from './input'

const commonDirectives = {
  input,
}
export default {
  install: (Vue, options) => {
    Object.keys(commonDirectives).forEach((curr) => {
      Vue.directive(curr, commonDirectives[curr])
    })
  },
}
