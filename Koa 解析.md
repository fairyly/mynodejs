# Koa 解析


## [application.js](https://github.com/koajs/koa/blob/master/lib/application.js)




## [context.js](https://github.com/koajs/koa/blob/master/lib/context.js)

```
const util = require('util');
const createError = require('http-errors');
const httpAssert = require('http-assert');
const delegate = require('delegates');
const statuses = require('statuses');
const Cookies = require('cookies');

const COOKIES = Symbol('context#cookies');


# 委托模式的简单实现 delegate

- 委托模式（Delegation Pattern），即外层暴露的对象将请求委托给内部的其他对象进行处理
- const delegate = require('delegates');
- 参考：
  - https://github.com/tj/node-delegates
  - https://imweb.io/topic/5bdfff38b5bbd42b053d0453


- 用法
delegates 基本用法就是将内部对象的变量或者函数绑定在暴露在外层的变量上，直接通过 delegates 方法进行如下委托，基本的委托方式包含：

getter：外部对象可以直接访问内部对象的值
setter：外部对象可以直接修改内部对象的值
access：包含 getter 与 setter 的功能
method：外部对象可以直接调用内部对象的函数

```
- __defineGetter__ is deprecated 被废弃后使用 use Object.defineProperty instead of __defineGetter__ or __defineSetter__
[ PR#20 ](https://github.com/ikoajs/node-delegates/commit/206da5921fa539062eb21e5d99f5828b7717fe1b)

- 参考：[node-delegates 源码](https://github.com/tj/node-delegates/blob/master/index.js)

- 这个 JS 源码中使用了委托:

在 koa 中，其核心就在于 context 对象，许多读写操作都是基于它进行，例如：

ctx.header 获取请求头  
ctx.method 获取请求方法  
ctx.url 获取请求 URL  
...

这些对请求参数的获取都得益于 koa 中 context.request 的许多属性都被委托在了 context 上：

又例如：

ctx.body 设置响应体
ctx.status 设置响应状态码
ctx.redirect() 请求重定向
...

这些对响应参数的设置都得益于 koa 中 context.response 的许多属性和方法都被委托在了 context 上：

```
delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');

/**
 * Request delegation.
 */

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('accept')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip');
```


## [request.js](https://github.com/koajs/koa/blob/master/lib/request.js)







## [response.js](https://github.com/koajs/koa/blob/master/lib/response.js)




## 参考
- [application.js](https://github.com/koajs/koa/blob/master/lib/application.js)
- [context.js](https://github.com/koajs/koa/blob/master/lib/context.js)
- [request.js](https://github.com/koajs/koa/blob/master/lib/request.js)
- [response.js](https://github.com/koajs/koa/blob/master/lib/response.js)
