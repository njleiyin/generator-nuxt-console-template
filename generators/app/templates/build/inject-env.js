require('dotenv').config()

/**
 * 发布路径
 */
exports.PUBLIC_PATH = process.env.PUBLIC_PATH

/**
 * API DOMAIN
 */
exports.API_SERVER = process.env.API_SERVER

/**
 * 打包部署环境标识
 */
exports.BUILD_ENV = process.env.BUILD_ENV || 'dev'

/**
 * cookie存储路径
 */
exports.COOKIE_PATH = process.env.COOKIE_PATH || '/'
