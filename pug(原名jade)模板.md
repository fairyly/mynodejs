# pug

严格缩进

* github: https://github.com/pugjs/pug

* website: https://pugjs.org/api/getting-started.html


```
index.pug:

ul
  li Item A
  li Item B
  li Item C
  
  
---------------
index.html

<ul>
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ul>

```

### 与 Express 集成

* Express 良好地集成了 Pug。

这是一个流行的 Node.js 网站框架，Pug 在其中扮演一个视图引擎的角色。  
您可以阅读 Express 优秀的文档来了解 Express 是如何与 Pug 集成的。  

* 生产环境下的默认配置 ¶

在 Express 框架里，环境变量 NODE_ENV 用来告知网站应用程序：它执行的环境是开发环境还是生产环境。  
Express 和 Pug 都会在生产环境下调整一些默认配置，以给用户提供更好的开箱即用的体验。  
特别是当 process.env.NODE_ENV 设置为 'production'、Pug 配合 Express 使用的时候，默认 compileDebug 为 false，cache 为 true。

如果需要覆盖 compileDebug 和 cache 的默认配置，您可以在 app.locals 或者 res.locals 对象里设置各自对应的选项。  
cache 选项也可以通过 Express 的 app.disable/enable('view cache') 来设定。  
更多的细节可以阅读 Express 的 API 参考文档。

