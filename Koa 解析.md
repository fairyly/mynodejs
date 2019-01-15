# Koa 解析


## [1.application.js](https://github.com/koajs/koa/blob/master/lib/application.js)

```
//1.首先创建了一个Application的类，继承了Emitter类，然后暴露出去。
module.exports = class Application extends Emitter {
  constructor() {  
    super();
    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }
}

//2.类下面有一个listen方法，创建http服务
listen(...args) {
  debug('listen');
  const server = http.createServer(
    this.callback()
  );   
  return server.listen(...args);
}


初始化koa的时候，这个类的下面有一个use方法，也就是我们添加中间件的方法。

 use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }

koa把所有的中间件放在一个数组里面，然后koa2也是兼容generator函数，为了兼容koa1的中间件。

callback方法Koa处理请求的方法。

callback() {
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }


koa 通过 compose 方法把中间件封装成一个 promise 对象，然后递归执行。使中间件数组变成洋葱圈，能递归线性处理上下文。

// 通过调用第一个函数,层层递归调用，然后达到洋葱模型


// compose方法把所有的中间的执行的时候，把第一个中间件封装成了一个psomise对象执行，然后同时在中间件里面写next()方法去递归执行下一个中间件。


```

- [compose](https://github.com/koajs/compose#readme)

```
# compose 源码

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```


## [2.context.js](https://github.com/koajs/koa/blob/master/lib/context.js)

 将 node 的 request 和 response 对象封装到单个对象中

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

请求(Request): 包含请求相关的一些属性。

Koa Request 对象是在 node 的 vanilla 请求对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。





## [response.js](https://github.com/koajs/koa/blob/master/lib/response.js)

响应(Response): 包含响应相关的一些属性。

Koa Response 对象是在 node 的 vanilla 响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。


## 参考
- [application.js](https://github.com/koajs/koa/blob/master/lib/application.js)
- [context.js](https://github.com/koajs/koa/blob/master/lib/context.js)
- [request.js](https://github.com/koajs/koa/blob/master/lib/request.js)
- [response.js](https://github.com/koajs/koa/blob/master/lib/response.js)
- [Koa框架源码分析](https://mp.weixin.qq.com/s/PiI4PTzUBNLPm2cKd71lyw)
