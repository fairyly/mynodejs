# nodejs 权威指南

* 1.REPL:交互式运行环境

```
.break: 返回命令行起点处；
.clear: 清除 repl 运行环境上下文保存的变量函数；
.exit: 退出 repl 
.help: 显示 repl 中所有基础命令；
.save: 把 repl 中输入的所有表达式保存到一个文件中；
.load: .load ./test.js 把某个文件保存的表达式依次加载到 repl 运行环境中；
```
* 2.控制台
```
console.dir(对象)：将对象信息输出到控制台；
console.time(string),console.timeEnd(string):统计一段代码的执行时间时
```

* 3.全局作用域及全局函数

```
console.log(global)
定时器对象的 unref 和 ref
unref: 取消定时器回调函数调用
ref: 恢复回调函数调用
```
