# pug

严格缩进

* github: https://github.com/pugjs/pug

* website: https://pugjs.org/api/getting-started.html  
  - https://pugjs.org/api/getting-started.html

* 安装 Pug：npm install -g pug

*使用 Pug

如果要通过命令行使用 Pug，需要安装 pug-cli
```
npm install -g pug-cli
```
* 通过命令行使用 pug
```
使用: pug [options] [dir|file ...]
选项:
  -h, --help         输出帮助信息
  -v, --version      输出版本号
  -o, --out <dir>    输出编译后的 HTML 到 <dir>
  -O, --obj <str>    JavaScript 选项(为模板变量提供定义)
  -p, --path <path>  在处理 stdio 时，查找包含文件时的查找路径
  -P, --pretty       格式化 HTML 输出
  -c, --client       编译浏览器端可用的 runtime.js
  -D, --no-debug     关闭编译的调试选项(函数会更小)
  -w, --watch        监视文件改变自动刷新编译结果
Examples:
  # 编译整个目录
  $ pug templates
  # 生成 {foo,bar}.html
  $ pug {foo,bar}.jade
  # 在标准IO下使用jade 
  $ pug < my.jade > my.html
  
  # 在标准IO下使用jade, 同时指定用于查找包含的文件
  $ pug < my.jade -p my.jade > my.html

```

* demo:

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

