import importModules from '@/utils/import-modules'
/**
 * exports all modules by name with pascalCase
 * 导出所有模块 模块名为小驼峰
 */
const apiModules = importModules(
  require.context('./apiModules', false, /\.js$/),
  {
    byArray: false,
    nameCase: importModules.CASE_CAMEL,
    nameModify: (name) => `${name}`,
  }
)
export default apiModules
