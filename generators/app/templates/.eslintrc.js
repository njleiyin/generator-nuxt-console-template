/**
 * eslint配置文件，不要修改这个文件
 * Created by leiyin on 2022/9/28.
 *
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off',
    'require-await': 'off',
    camelcase: 'off',
    semi: 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 0,
    'vue/html-self-closing': 0,
    'arrow-parens': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-useless-escape': 0,
    'unicorn/escape-case': 0,
  },
}
