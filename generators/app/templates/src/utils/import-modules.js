const CaseModifier = require('case-modifier')

/**
 * 导入指定目录下模块
 * Created by leiyin on 2022/7/8.
 *
 * @param {*} r request webpack#require.context
 * @param {*} [options] 配置项
 * > 参数详情如下：
 *  - `include`: {RegExp} 指定项
 *  - `exclude`: {RegExp} 排除项
 *  - `byArray`: {Boolean} 集合类型，默认数组
 *  - `nameCase`: {String} 模块名格式，如：`importModules.CASE_PASCAL`(大驼峰)，详情见{@link case-modifier}
 *
 * @returns {Array|Object}
 */
const importModules = (r, options) => {
  const {
    include,
    exclude,
    byArray = true,
    nameCase,
    nameModify,
  } = options || {}

  const _modifier = nameCase && CaseModifier[nameCase]

  const modules = byArray ? [] : {}

  r.keys().forEach((file) => {
    let moduleName = file.replace(/^\.\/(.*)\.\w+$/, '$1')
    // 排除项匹配
    if (include) {
      if (!include.test(moduleName)) return
    } else if (exclude && exclude.test(moduleName)) return

    const module = r(file)
    if (byArray) {
      modules.push(module.default || module)
    } else {
      // 格式化模块名
      if (_modifier) moduleName = _modifier(moduleName)
      if (typeof nameModify === 'function') moduleName = nameModify(moduleName)
      modules[moduleName] = module.default || module
    }
  })
  return modules
}

// case-types
Object.keys(CaseModifier).forEach((key) => {
  if (key.startsWith('CASE_')) {
    Object.defineProperty(importModules, key, {
      value: CaseModifier[key],
      writable: false,
    })
  }
})

export default importModules
