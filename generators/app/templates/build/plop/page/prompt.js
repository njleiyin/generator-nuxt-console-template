const path = require('path')
const { properCase } = require('case-modifier')
const { notEmpty } = require('../validate')

const resolve = (p) => path.join(__dirname, '../../..', p)

module.exports = {
  description: 'generate a page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Page name:',
      validate: notEmpty('name'),
    },
    {
      type: 'input',
      name: 'title',
      message: 'Page title:',
      validate: notEmpty('title'),
    },
    {
      type: 'input',
      name: 'module',
      message: 'Page module:',
    },
    {
      type: 'list',
      name: 'template',
      message: 'Page template:',
      choices: ['default', 'data-table'],
      default: 'default',
    },
  ],
  actions: (data) => {
    let filepath = null // 输出路径
    let filename = null // 默认文件名
    let propName = null // 组件名
    let template = 'plop/page/' // 模板
    switch (data.template) {
      case 'data-table':
        template += 'data-table.hbs'
        filename = 'list.vue'
        break
      default:
        template += 'index.hbs'
        filename = 'index.vue'
    }

    if (data.module) {
      filepath = `src/pages/${data.module}/${data.name}.vue`
      propName = `${path.basename(data.module)}${properCase(data.name)}`
    } else {
      filepath = `src/pages/${data.name}/` + filename
      propName = data.name
    }

    data.name = propName

    const actions = [
      {
        type: 'add',
        path: resolve(filepath),
        templateFile: template,
        data: {
          name: propName,
          title: data.title,
        },
      },
    ]

    return actions
  },
}
