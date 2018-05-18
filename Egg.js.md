# Egg.js

## install
```
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i
启动项目:

$ npm run dev
$ open localhost:7001
```

## 逐步搭建
```
初始化项目
先来初始化下目录结构：

$ mkdir egg-example
$ cd egg-example
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev
添加 npm scripts 到 package.json：

{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}
 编写 Controller
如果你熟悉 Web 开发或 MVC，肯定猜到我们第一步需要编写的是 Controller 和 Router。

// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;


配置路由映射：

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};


加一个配置文件：

// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;
此时目录结构如下：

egg-example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json
完整的目录结构规范参见目录结构http://eggjs.org/zh-cn/basics/structure.html。

好，现在可以启动应用来体验下

$ npm run dev
$ open localhost:7001
```
