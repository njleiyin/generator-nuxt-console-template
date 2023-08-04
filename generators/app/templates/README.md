# nuxt-console-template

nuxt管理后台

## Docs

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Script

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
# using mock api to develop
$ yarn mock

# using mock api to develop which doesn't need login
$ yarn mock:nologin

# using backend api to develop
$ yarn dev

# build for production
$ yarn build
```

## 环境变量

使用.env 设置环境变量, 即在项目根目录新建一个.env 文件, 填写环境变量即可。

.env 文件示例:

```sh
# 左边是变量名(一般大写，下划线分割单词)，右边是变量值
# 注意=号两边不能有空格
TESTING_VAR=just-fot-testing
ANOTHER_VAR=another
```

可以在项目的 vue 文件或 js 文件中读取

```js
mounted() {
  console.log(process.env.TESTING_VAR) // 输出 just-fot-testing
}
```

**工程自带的环境变量**

```sh
# axios的baseURL，可不传。不传时，则使用相对路径发送请求
API_SERVER=
# 对应webpack的publicPath，一定要/结尾
PUBLIC_PATH=
# 传1则不会有登录拦截
NO_LOGIN=
# cookie的path
COOKIE_PATH=
# 线上环境
BUILD_ENV=
# oss上传文件配置
OSS_BUCKET=bucket-showyu
OSS_REGION=oss-cn-beijing
# 以上内容所有环境都一样，只有OSS_DIR各环境才有区别
OSS_DIR=product-test/
OSS_CUSTOM_DOMAIN=bucket.ishowyu.com
```

**环境变量说明**

| 环境变量名        | 说明                                                                                                                        | 默认值                  | 示例                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- |
| API_SERVER        | axios 的 baseURL，可不传。不传时，则使用相对路径发送请求                                                                    |                         |                         |
| PUBLIC_PATH       | 对应 webpack 的 publicPath，用于指定静态文件访问路径，一定要/结尾                                                           | http://cdn.deepexi.com/ | http://cdn.deepexi.com/ |
| NO_LOGIN          | 是否登陆拦截，传 1 则不会有登录拦截                                                                                         |                         | 1                       |
| COOKIE_PATH       | 用于设置 cookie 的 path，如果多个项目需要共享 cookie，则应该保证项目在共同的目录下，且设置 COOKIE_PATH 为它们的共同目录地址 | /                       | /xpaas                  |
| BUILD_ENV         | 线上环境区分 dev(开发)、test(测试)、prod(生产)                                                                              | dev                     | dev                     |
| OSS_BUCKET        | 指定bucket，不区分环境                                                                                                      | bucket-showyu           | bucket-showyu           |
| OSS_REGION        | 指定区域，不区分环境                                                                                                        | oss-cn-beijing          | oss-cn-beijing          |
| OSS_DIR           | 图片存放文件夹，dev 和测试是一样的（product-test/），生产不一样（product-center/）                                          | product-test/           | product-test/           |
| OSS_CUSTOM_DOMAIN | 指定域名，不区分环境                                                                                                        | bucket.ishowyu.com      | bucket.ishowyu.com      |


## 构建

构建默认生成的是 hash 路由模式的 spa

命令如下:

```sh
yarn build
```

构建必传的环境变量有:

```sh
PUBLIC_PATH=
```

## 开发规范

[开发文档](./doc/dev.md)

[页面标题的配置说明](./doc/页面标题的配置.md)
