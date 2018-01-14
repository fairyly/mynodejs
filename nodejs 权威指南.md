# nodejs 权威指南

* 示例中参数带 `[]` 表示可选参数

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

console.log(require.cache): 查看已加载模块的缓存区

__filename: 获取当前模块问阿金的带有完整绝对路径的文件名；
__dirname: 获取当前模块问阿金的带有完整绝对路径;

事件：
addListener(eventname,listener function):事件绑定
on(eventname,listener function):事件绑定
once(eventname,listener function): 只执行一次的事件绑定
removeListener(eventname,listener function): 解除事件处理函数
removeAllListener([eventname]): 对指定事件解除所有事件处理函数
setMaxListeners(n): 指定事件处理函数的最大数量
listeners(eventname): 获取指定事件的所有事件处理函数
emit(eventname,参数1，...)

var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
  console.log(res.url);
  res.end();
})
server.listen(3000,'127.0.0.1')


调试脚本：

node debug app.js

如果继续执行，在 debug 命令后输入 cont 或 c, 继续执行

next 或 n  :执行下一句
step 或 s : 暂停第一行代码以前
out 或 o : 立即执行剩余代码

观察变量值或表达式：
watch('i');
watch('i==100');

unwatch(): 解除观察

设置断点和取消断点：
setBreakpoint(filename,line): setBreakpoint(12)
或
sb(filename,line)

取消断点：
clearBreakpoint(filename,line)
或
cb(filename,line)

node-inspector: nodejs 调试工具
npm i -g node-inspector

```
* 4.使用 Buffer 类处理二进制数据

```
buf = new Buffer(size);
buf.fill(value,[offset],[end])

new Buffer(array);

new Buffer(str);

字符串之间转换:
buf.toString([encodinf],[start],[end])
buf.toString('utf8',3,5)

Buffer 的 write 方法
buf.write(string,[offset],[length],[encoding])
buf.write('test',5,6)

也可以使用 StringDecoder 将 Buffer 中的数据转换成字符串
var StringDecoder = require('string_decoder').StringDecoder
var decoder = new StringDecoder([encoding])
decoder.write(buf)

与 json 之间转换：
JSON.stringify(buf);
new Buffer(JSON.parse(json));

复制缓存数据：
buf.copy(targtbuf,[targetStart],[sourceStart],[sourceEnd])
```
Buffer 类的类方法
```
Buffer.isBuffer(obj): 判断一个对象是否为 Buffer 对象
Buffer.byteLength(string,[encoding]): 计算一个指定字符串的字节数
Buffer.concat([buf1,buf2]): 合并 Buffer 对象
Buffer.isEncoding(encoding): 检查一个字符串是否为一个有效的编码格式字符串
```
