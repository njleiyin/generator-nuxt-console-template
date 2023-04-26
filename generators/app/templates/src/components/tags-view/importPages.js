import importModules from '@/utils/import-modules'
/**
 * exports all modules by name with pascalCase
 * 导出所有模块 模块名为小驼峰
 */
const pages = importModules(require.context('../../pages', true, /\.vue$/), {
  byArray: false,
  nameModify: (name) => `${name}`,
})
export default pages
