# supervisor

代码改变会自动重启服务,

缺点: 报错后会一直报错

* https://github.com/petruisfan/node-supervisor

* Simple Install

Just run:
```
npm install supervisor -g
```

运行 supervisor index 启动程序

supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。
