# express 模块

* Express:http://www.expressjs.com.cn/
* Express 4.x API 中文手册:http://www.expressjs.com.cn/4x/api.html
* Express 应用生成器:  npm install express-generator -g
* 创建一个命名为 myapp 的应用: express myapp


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
