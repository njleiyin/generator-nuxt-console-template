import _get from 'lodash/get'
import _set from 'lodash/set'

// 所有的验证类型
const validateTypes = {
  int: /\D|\b(0+)/g,
  number: /\D|\b/g,
}

/**
 * 替换函数
 * @param el
 * @param expression
 * @param modifiers
 * @param vnode
 */
const formatValue = (el, { expression, modifiers, arg }, vnode) => {
  const [firstModifier] = Object.keys(modifiers)
  // 获取替换前value
  const oldVal = `${_get(vnode.context, expression)}`
  // 正则替换不符合的value
  _set(
    vnode.context,
    expression,
    oldVal.replace(validateTypes[firstModifier], '')
  )
}

export default {
  name: 'int',
  update(el, { expression, modifiers }, vnode) {
    formatValue(el, { expression, modifiers }, vnode)
  },
}
