const fs = require('fs')
const dotenv = require('dotenv')
require('dotenv').config()
// avoid warnings, overwrite defaultMaxListeners
require('events').EventEmitter.defaultMaxListeners = 15

// 打包运行模式（mock、dev、prod）
const MODE = process.env.MODE
// 运行模式（development、production）
const NODE_ENV = process.env.NODE_ENV

const env = dotenv.parse(fs.readFileSync('.env.' + MODE))

const isProd = NODE_ENV === 'production'

Object.entries(env).forEach(([key, value]) => {
  if (Object.prototype.hasOwnProperty.call(env, key)) {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
  // 打印env
  // eslint-disable-next-line
  console.log('%s\t: %s', key, value)
})

/**
 * proxy 代理配置
 */
const proxyUrl = 'http://localhost:3002/api'

const config = {
  env: {
    '/auth': `${proxyUrl}`,
    // '/auth': {
    //   target: proxyUrl,
    //   changeOrigin: true,
    //   secure: false,
    //   pathRewrite: {
    //     '^/auth': '',
    //   },
    // },
  },
}

let axios = {
  proxy: true,
}

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && env.API_SERVER) {
  axios = {
    proxy: false,
    baseURL: env.API_SERVER,
  }
}

module.exports = {
  mode: 'spa',
  env,
  proxy: config.env,
  router: {
    base: '/',
    mode: 'hash',
  },
  /*
   ** Build configuration
   */
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module'],
  ],
  build: {
    publicPath: env.PUBLIC_PATH,
    extractCSS: isProd,
    postcss: {
      plugins: {},
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev }) {
      if (isDev) {
        config.devtool = 'source-map'
      }
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '<%= name %>',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1' },
      {
        hid: 'description',
        name: 'description',
        content: '<%= name %>',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: false, // 禁用loadingBar
  css: [
    {
      src: '~/assets/global.less',
      lang: 'less',
    },
  ],

  srcDir: 'src/',
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/components' },
    { src: '~/plugins/filter' },
    { src: '~/plugins/directive' },
    { src: '~/plugins/interceptor' },
    { src: '~/plugins/access-control' },
  ],
  modules: [['@nuxtjs/axios'], ['@nuxtjs/dotenv', { path: './' }]],
  axios,
}
