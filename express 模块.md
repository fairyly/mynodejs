# express 模块

* Express:http://www.expressjs.com.cn/
* Express 4.x API 中文手册:http://www.expressjs.com.cn/4x/api.html
* Express 应用生成器:  npm install express-generator -g
* 创建一个命名为 myapp 的应用: express myapp

**express 有成百上千的第三方中间件，在开发过程中我们首先应该去 npm 上寻找是否有类似实现的中间件，尽量避免造轮子，节省开发时间。
下面给出几个常用的搜索 npm 模块的网站：**
```
http://npmjs.com(npm 官网)
http://node-modules.com
https://npms.io
https://nodejsmodules.org
```


* 跨域问题
  - https://github.com/expressjs/cors
  - https://cnodejs.org/topic/51dccb43d44cbfa3042752c8
  - https://www.tuicool.com/articles/vYBR3y
  ```
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
  });
  
  根据上边的代码的完善

  //allow custom header and CORS
  app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });
  ```
  
### 1.使用 express 创建项目

- 先在cmd控制台里cd到一个目录下面，记住这你的workspace，然后是用是用express创建一个app项目

  ```
    express hello-world 
  ```
- cd到hello-world目录 npm i （这样就会自动将项目需要的依赖modules安装到项目的modules里去了）

  - npm start 启动项目（也可以是node ./bin/www，旧版本直接node app.js，因为具体要看package.json里的启动配置了）
  - 我们可以在浏览器地址栏里敲入 http://127.0.0.1:3000/ 这就是你的第一个express创建的node app。

- 研究下express创建项目

  - 你需要了解的项目主要目录为：routes和views，你最好再在项目里新建一个目录叫models（作用后面讲）
  - routes里index.js配置的都是get和post请求的路径映射关系，很简单的哦。
  - views里index.ejs就相当于一个html文件，里面就是一些html标签和<%%>标签，感觉和jsp差不多哦。
  - 看起来不错的样子，标准的MVC框架（models里放模型，views里面放展示，routes里面放控制）


### express 路由配置
一、为Express添加about路由

1、新建js文件，about.js

2、打开about.js，并输入以下代码：
```
var express=require('express');

var router=express.Router();

router.get('/',function(req,res,next){

　　res.send('Hello from the about route!');

});

module.exports=router;
```

2、打开app.js,然后输入以下代码：
```
var about=require('./routes/about');

app.use('/about',about);
```

3、在浏览器输入：http://127.0.0.1:3000/about，然后回车，如果显示Hello from the about route!,表示路由配置成功。

二、添加Post路由

1、打开app.js,然后输入以下代码：
```
app.post('/',function(req,res,next){

　　res.send(req.body);

});
```

其他请求路由：
```
// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

### 方法	         描述
- res.download()	提示下载文件。
- res.end()	终结响应处理流程。
- res.json()	发送一个 JSON 格式的响应。
- res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
- res.redirect()	重定向请求。
- res.render()	渲染视图模板。
- res.send()	发送各种类型的响应。
- res.sendFile	以八位字节流的形式发送文件。
- res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

### 路由级中间件

```
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

错误处理中间件:

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))
```
demo:
```
const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')

// 日志
const winston = require('winston')
const expressWinston = require('express-winston')

const app = express()

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))
// flash 中间件，用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件 顺序很重要,要加在路由前,不然会报错
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})


// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))

// 路由
routes(app)

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))


// 错误处理
app.use(function (err, req, res, next) {
  console.error(err)
  req.flash('error', err.message)
  res.redirect('/posts')
})

// 监听端口，启动程序
/*app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})*/
if (module.parent) {
  // 被 require，则导出 app
  module.exports = app
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
  })
}

```

### 在 Express 中使用模板引擎

需要在应用中进行如下设置才能让 Express 渲染模板文件：
```
views, 放模板文件的目录，比如： app.set('views', './views')
view engine, 模板引擎，比如： app.set('view engine', 'jade')


// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

```

### 如何处理 404 ？
在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。  
这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。  
你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：  
```  
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


 // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })

  // 500 错误处理
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    if (!res.headersSent) {
      res.status(500).render('500')
    }
  })
```
### 如何设置一个错误处理器？
错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)：
```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```


### 进程管理

开发环境使用 
```
  npm i -g supervisor
  运行 supervisor index 启动程序
```

生产环境使用
```
  npm i pm2 -g
 
  修改 package.json，添加 start 的命令：

  package.json

  "scripts": {
    "test": "istanbul cover _mocha",
    "start": "NODE_ENV=production pm2 start index.js --name 'myblog'"
  }
  然后运行 npm start 通过 pm2 启动程序

  pm2 常用命令:

  pm2 start/stop: 启动/停止程序
  pm2 reload/restart [id|name]: 重启程序
  pm2 logs [id|name]: 查看日志
  pm2 l/list: 列出程序列表
  更多命令请使用 pm2 -h 查看。
```
