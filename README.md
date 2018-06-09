# mynodejs
mynodejs

```
  $ git clone https://github.com/fairyly/mynodejs.git -b 了不起的Node.js
```


### 01 

Node：单线程

目前API: http://nodejs.cn/api/

事件轮询： Node 先去注册事件，随后不停的询问内核这些事件是否分发，当事件分发时，
  对应的回调函数就会触发，然后继续执行下去，如果没有事件触发，则继续执行其他代码，直到有新事件时，再去执行对应的回调函数
- get colors in your node.js console :在 node 控制台打印颜色
  - colors: https://github.com/Marak/colors.js

'\033[33mEnter your choice: \033[339m': (ANSI转义码)让文本呈现颜色

用户输入： process.stdout.write()
监听用户的输入: process.stdin.on('data', function (chunk) {})
获取当前工作目录： process.cwd();


- TCP：面向连接的
  - 面向字节
  - 可靠性
  - 流控制
  - 拥堵控制
  - 