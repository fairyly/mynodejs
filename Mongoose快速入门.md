# Mongoose快速入门

* https://cnodejs.org/topic/595d9ad5a4de5625080fe118

使用方法：

1. 安装好 mongodb 数据库后 启动数据库 介绍在 [mongodb 部分](https://github.com/fairyly/mynodejs/blob/gh-pages/mongodb%20%E9%83%A8%E5%88%86.md)

2. 安装 mongoose: npm i mongoose

3. 引入模块，连接 mongodb
  ```
    var mongoose = require('mongoose');

    var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
  ```
