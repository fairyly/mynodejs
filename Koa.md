# koa


- 使用 Koa + MongoDB + Redis 搭建论坛系统
  - https://github.com/nswbmw/N-club

- doc: https://nswbmw.github.io/N-club/




koa 的文档和源码，也就一小时能搞定吧

https://github.com/koajs/koa/blob/master/lib/application.js

源码一共 4 个文件，加注释和空格合在一起也才 2000 行左右，大部分逻辑都是 getter / setter

https://github.com/koajs/koa/blob/master/docs/api/index.md

文档的 md 文件，合在一起也才 1000 行左右。

核心依赖也就一个 https://github.com/koajs/compose 来实现 Middleware ， 50 行代码。



## 参考资料
- http://www.ruanyifeng.com/blog/2017/08/koa.html
