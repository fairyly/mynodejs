# Egg.js
- doc: http://eggjs.org/zh-cn/intro/quickstart.html

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

# 注意：
```
Controller 有 class 和 exports 两种编写方式，本文示范的是前者，你可能需要参考 Controller 文档。
Config 也有 module.exports 和 exports 的写法，具体参考 Node.js modules 文档。
 静态资源
Egg 内置了 static 插件，线上环境建议部署到 CDN，无需该插件。

static 插件默认映射 /public/* -> app/public/* 目录

此处，我们把静态资源都放到 app/public 目录即可：

app/public
├── css
│   └── news.css
└── js
    ├── lib.js
    └── news.js
```

# #模板渲染
```
在本例中，我们使用 Nunjucks 来渲染，先安装对应的插件 egg-view-nunjucks ：

$ npm i egg-view-nunjucks --save
开启插件：

// config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};
// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
注意：是 config 目录，不是 app/config!

为列表页编写模板文件，一般放置在 app/view 目录下

<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
添加 Controller 和 Router

// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' }
      ]
    };
    await this.ctx.render('news/list.tpl', dataList);
  }
}

module.exports = NewsController;

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
};
启动浏览器，访问 http://localhost:7001/news 即可看到渲染后的页面。
```
