# 基于vue+nuxt的前端后台管理系统快速生成器

------------

开始安装

首先确保自己已经安装了nodejs

然后安装yeoman

```js
yarn global add yo
```


然后安装脚手架

```js
yarn global add generator-nuxt-console-template
```


在自己的空项目中运行：

```js
yo nuxt-console-template
```

然后就会在此目录下生成以下目录结构：

    ├── build   // 可以快速生成基础页面
    │   ├──  plop    
    │   │   ├── page
    │   │   └── validate.js
    │   ├── inject-env.js
    │   ├── plopfile.js
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── const
    │   ├── container
    │   ├── directive
    │   ├── layouts
    │   ├── middleware
    │   ├── mixins
    │   ├── pages
    │   ├── plugins
    │   ├── static
    │   ├── store
    │   └── utils
    ├── .editorconfig
    ├── .env.dev
    ├── .env.prod
    ├── .eslintrc.js
    ├── .npmrc
    ├── .nuxtignore
    ├── .prettierrc
    ├── .stylelintrc
    ├── jsconfig.json
    ├── nuxt.config.js
    ├── package.json
    └── README.md


然后使用以下命令启动服务：

```js
yarn dev
```
本项目默认监听端口是3001，所以在浏览器输入 [http://localhost:3001](http://localhost:3001) 就能看到效果了。

开发完成之后，对项目进行打包，使用以下命令：
```js
yarn build
```
