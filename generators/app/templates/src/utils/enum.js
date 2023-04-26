/**
 * Enum Structure likely Factory
 *
 * ### Usage
 * ```js
 * @param {} entries  two-dimensional array
 *
 * entries= [
 *   [1, 'red', {$key: 'RED', title: '红色'}],
 *   [2, 'yellow', {$key: 'YELLOW', title: '黄色'}],
 *   [3, 'blue', {$key: 'BLUE', title: '蓝色'}]
 * ]
 *
 * 兼容定义
 * entries = [
 *   [1, 'red', $key, { title: '红色'}],
 *   [2, 'yellow', $key, { title: '黄色'}],
 *   [3, 'blue', $key, { title: '蓝色'}]
 * ]
 *
 * @param {Object} parent = {}
 *
 * // 使用
 * ColorType.RED // 1
 *
 * ColorType.of(ColorType.RED) // { value: 1,label: 'red', props: { title: '红色‘ } }
 *
 * ColorType.labelOf(ColorType.YELLOW) // 'yellow'
 *
 * ColorType.values() // [1, 2, 3]
 *
 * ColorType.options() // 返回`select-options`数据结构
 * ```
 *
 * @props $key（exposedKey）约定大写
 * @tips props（展开项传入）,合并至entry的`props`属性，即`entry.props.propKey1`
 *
 */
export default class EnumFactory {
  formatList = [] // SELECT选择框数据格式化，处理label有重复情况
  List = []
  #values = []
  #labels = []

  /**
   * @param {Array} entries EntryList 2D [ [value, label,$key, {...props: extraProps}], ... ]
   * @throws {TypeError|Error}
   */
  constructor(entries, parent) {
    if (!(Array.isArray(entries) && entries.length && Array.isArray(entries[0]) && entries[0].length > 1)) {
      throw new TypeError('[EnumFactory]: entries must be Array (2D) and NOT empty')
    }

    this.List = entries.map(([value, label, extra]) => {
      if (value == null || value === '') {
        console.warn('[EnumFactory]: value should not be falsy')
      }

      if (this.#values.includes(value)) {
        throw new Error('[EnumFactory]: duplicated value: ' + value)
      }

      this.#values.push(value)
      this.#labels.push(label)

      // exposed key & extra props
      const { $key, ...props } = getKey(extra)

      $key && (this[$key] = value)

      return isPrettyObject(props) ? { value, label, props } : { value, label }
    })
    this.formatList = formatList(entries)

    // 其他属性增加
    isPrettyObject(parent) &&
      Object.keys(parent).forEach((key) => {
        this[key] = parent[key]
      })

    // freeze instance
    if (new.target === EnumFactory) {
      deepFreeze(this)
    }
  }

  /**
   * find entry of value
   *
   * @param {*} val value
   *
   * @returns {*} entry
   */
  of(val) {
    return this.List.find(({ value }) => `${val}` === `${value}`) // 兼容Number|String类型相等性判断
  }

  /**
   * find label of value
   *
   * @param {*} val value
   *
   * @returns {String} label
   */
  labelOf(val) {
    const entry = this.of(val)
    return entry && entry.label
  }

  /**
   * to select options
   *
   * @param {Boolean|Object} unshiftIt 插入项
   * @param {Boolean|Object} pushIt 追加项
   *
   * @returns {Array} [{ label, value }]
   */
  options(unshiftIt, pushIt) {
    let options = []
    if (unshiftIt === true) {
      options.push({ label: '全部', value: '' })
    } else if (unshiftIt && unshiftIt.label && unshiftIt.value) {
      options.push(unshiftIt)
    }

    options = options.concat(this.List)

    if (pushIt && pushIt.label && pushIt.value) {
      options.push(pushIt)
    }

    return options
  }

  values() {
    return this.#values
  }

  labels() {
    return this.#labels
  }
}

/**
 * freeze deeply
 * @param {*} object
 */
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object)
  propNames.forEach((name) => {
    const prop = object[name]
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop)
    }
  })

  return Object.freeze(object)
}

/**
 * 判断第三个参数extra的类型，并分离$key，props键值
 * @param extra
 * @return {$key, ...props}
 * */
function getKey(extra) {
  const { $key, ...props } = isPrettyObject(extra) ? extra : extra ? { $key: extra } : {}

  return { $key, ...props }
}

/**
 * 判断非{}对象
 * @param Object
 * @return Boolean
 * */
function isPrettyObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length !== 0
}
/**
 * SELECT选择框数据格式化，处理label有重复情况
 * @param datas [ [value, label, extra] ] 数据
 * @return [{value, label, props}]
 * */
function formatList(datas) {
  const options = []

  datas.forEach(([value, label, { $key, ...props } = {}]) => {
    const index = options.findIndex((e) => e.label === label)
    if (index === -1) {
      const item = { value, label }
      isPrettyObject(props) && (item.props = props)
      options.push(item)
    } else {
      // 批量搜索
      options[index].value = options[index].value + ',' + value
    }
  })

  return options
}
