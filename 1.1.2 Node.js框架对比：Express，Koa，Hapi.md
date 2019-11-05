# Node.js框架对比：Express，Koa，Hapi

# Node.js Framework Comparison: Express vs. Koa vs. Hapi

## 3 Creating a server
- 3.1 Express
```
var express = require('express');
var app = express();

var server = app.listen(3000, function() {
    console.log('Express is listening to http://localhost:3000');
});
```


- 3.2 Koa
```
var koa = require('koa');
var app = koa();

var server = app.listen(3000, function() {
    console.log('Koa is listening to http://localhost:3000');
});
```

- 3.3 Hapi
```
var Hapi = require('hapi');
var server = new Hapi.Server(3000);

server.start(function() {
    console.log('Hapi is listening to http://localhost:3000');
});
```

## 参考资料
- 译文：http://ourjs.com/detail/5490db1c8a34fa320400000e
- 原文： https://www.airpair.com/node.js/posts/nodejs-framework-comparison-express-koa-hapi
