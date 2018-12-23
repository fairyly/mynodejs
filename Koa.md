# koa


- 使用 Koa + MongoDB + Redis 搭建论坛系统
  - https://github.com/nswbmw/N-club

- doc: https://nswbmw.github.io/N-club/




koa 的文档和源码，也就一小时能搞定吧

https://github.com/koajs/koa/blob/master/lib/application.js


```
application.js	
context.js	
request.js	
response.js
```

源码一共 4 个文件，加注释和空格合在一起也才 2000 行左右，大部分逻辑都是 getter / setter

https://github.com/koajs/koa/blob/master/docs/api/index.md

文档的 md 文件，合在一起也才 1000 行左右。

核心依赖也就一个 https://github.com/koajs/compose 来实现 Middleware ， 50 行代码。



## koa 中间件的原理: 洋葱模型
>基于async/await 可以更好的处理异步操作。 

- 多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

- 最外层的中间件首先执行。
- 调用next函数，把执行权交给下一个中间件。
- ...
- 最内层的中间件最后执行。
- 执行结束后，把执行权交回上一层的中间件。
- ...
- 最外层的中间件收回执行权之后，执行next函数后面的代码。

>几乎koa的中间件都会被co给包装一次，  
而每一个中间件又可以通过Promise的then去监测其后一个中间件是否结束，  
后一个中间件结束后会执行前一个中间件用then监听的操作，  
这个操作便是执行该中间件yield next后面的那些代码  

>每次执行use方法，就把外面传进来的generator函数push到middleware数组中
|             
|   **当前中间件**（promise.then() 监测 后一个中间件是否结束）   
|   **后一个中间件** 执行结束，就会在前一个中间件中then() 回调中调用方法，依次向上一个中间件的.then()回调中调用方法，后面每个中间件（也有一个 promise.then() 监测后一个中间件 ）  
|   .......       
|   依次类推下一个，下下一个都类似，通过前一个中间件的 next（）方法，调用下一个中间件
|    

![](https://user-gold-cdn.xitu.io/2017/5/18/b66d6f4b38ce931f512d1c3a12588500?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
- 参考： [你知道 koa 中间件执行原理吗?](https://juejin.im/post/591c8b4544d904006c90a2cb)

## 常见 中间件

- No.1 koa-router

>路由是Web框架必不可少的基础功能，koa.js为了保持自身的精简，并没有像Express.js自带了路由功能，因此koa-router做了很好的补充，作为koa星数最多的中间件，koa-router提供了全面的路由功能，比如类似Express的app.get/post/put的写法，URL命名参数、路由命名、支持加载多个中间件、嵌套路由等。其他可选路由中间件：koa-route, koa-joi-router, koa-trie-router

- No.2 koa-bodyparser
>koa.js并没有内置Request Body的解析器，当我们需要解析请求体时需要加载额外的中间件，官方提供的koa-bodyparser是个很不错的选择，支持x-www-form-urlencoded, application/json等格式的请求体，但不支持form-data的请求体，需要借助 formidable 这个库，也可以直接使用 koa-body 或 koa-better-body
koa2 使用 koa-body 代替 koa-bodyparser 和 koa-multer

- 2.1 koa-body 主要是下面两个依赖：
```
"co-body": "^5.1.1",
"formidable": "^1.1.1"
```
- [源码二百行左右](https://github.com/dlau/koa-body/blob/master/index.js)

- No.3 koa-views
>koa-views对需要进行视图模板渲染的应用是个不可缺少的中间件，支持ejs, nunjucks等众多模板引擎。

- No.4 koa-static
>Node.js除了处理动态请求，也可以用作类似Nginx的静态文件服务，在本地开发时特别方便，可用于加载前端文件或后端Fake数据，可结合 koa-compress 和 koa-mount 使用。

- No.5 koa-session
>HTTP是无状态协议，为了保持用户状态，我们一般使用Session会话，koa-session提供了这样的功能，既支持将会话信息存储在本地Cookie，也支持存储在如Redis, MongoDB这样的外部存储设备。

- No.6 koa-jwt
>随着网站前后端分离方案的流行，越来越多的网站从Session Base转为使用Token Base，JWT(Json Web Tokens)作为一个开放的标准被很多网站采用，koa-jwt这个中间件使用JWT认证HTTP请求。

- No.7 koa-helmet
>网络安全得到越来越多的重视，helmet 通过增加如Strict-Transport-Security, X-Frame-Options, X-Frame-Options等HTTP头提高Express应用程序的安全性，koa-helmet为koa程序提供了类似的功能，参考Node.js安全清单。

- No.8 koa-compress
>当响应体比较大时，我们一般会启用类似Gzip的压缩技术减少传输内容，koa-compress提供了这样的功能，可根据需要进行灵活的配置。

- No.9 koa-logger
>koa-logger提供了输出请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息，对于调试和跟踪应用程序特别有帮助，koa-bunyan-logger 提供了更丰富的功能。

- No.10 koa-convert
>对于比较老的使用Generate函数的koa中间件(< koa2)，官方提供了一个灵活的工具可以将他们转为基于Promise的中间件供Koa2使用，同样也可以将新的基于Promise的中间件转为旧式的Generate中间件。
 
 





## 参考资料
- [Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)
- [nodejs 写 swagger 文档的正确方式](https://cnodejs.org/topic/5900779931e8c2bb1c3dce85)
