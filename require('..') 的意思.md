# require('..') 的意思

在看到[xudafeng 的 ipv4 npm package 中写法](https://github.com/xudafeng/ipv4/blob/master/bin/ipv4)

.为当前

..为上层

node中加载包会有这样的策略

如果没有指定文件名，则默认寻找index

如果没有指定后缀，默认寻找 .js .json

.. 可以认为是这样的：

../index.js or ../index.json




## 参考
- https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_require
