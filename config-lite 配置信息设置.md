# config-lite

>一个超级简单的和灵活的和有用的配置模块

## Install
```
$ npm i config-lite --save
```

config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件。

如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，

config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 NODE_ENV=test node app 启动，则 config-lite 会依次降级查找

config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 

如果程序以 NODE_ENV=production node app 启动，

则 config-lite 会依次降级查找 

config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 

并合并 default 配置。

config-lite 还支持冒泡查找配置，即从传入的路径开始，从该目录不断往上一级目录查找 config 目录，直到找到或者到达根目录为止。

- 一般在 项目 下新建 config 目录，在该目录下新建 default.js，添加代码：

n-blog: config/default.js

```
module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
```

## 参考资料
- https://github.com/nswbmw/N-blog/blob/master/book/4.3%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.md
