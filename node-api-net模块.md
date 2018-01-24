# net (网络)

### 1.net.isIP(input)   net.isIPv4(input)      net.isIPv6(input)
```
net.isIP(input)#
查看英文版 / 查看英文md文件 / 编辑中文md文件

新增于: v0.3.0
测试 input 是否是 IP 地址。无效的字符串则返回 0，IPv4 地址则返回 4，IPv6的地址则返回 6。

net.isIPv4(input)#
查看英文版 / 查看英文md文件 / 编辑中文md文件

新增于: v0.3.0
如果 input 是 IPv4 地址则返回 true，否则返回 false。

net.isIPv6(input)#
查看英文版 / 查看英文md文件 / 编辑中文md文件

新增于: v0.3.0这个类用于创建 TCP 或 IPC server。

new net.Server([options][, connectionListener])#
查看英文版 / 查看英文md文件 / 编辑中文md文件

返回: <net.Server>
查看 net.createServer([options][, connectionListener]).

net.Server is an EventEmitter实现了以下事件:
如果 input 是 IPv6 地址则返回 true，否则返回 false。
```


### 2.net.Server 类

这个类用于创建 TCP 或 IPC server。

new net.Server([options][, connectionListener])#
查看英文版 / 查看英文md文件 / 编辑中文md文件

返回: <net.Server>
查看 net.createServer([options][, connectionListener]).

### 3.net.Server is an EventEmitter实现了以下事件:
```
'close' 事件
'error' 事件
'listening' 事件
server.address()

const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // handle errors here
  throw err;
});

// grab an arbitrary unused port.
server.listen(() => {
  console.log('opened server on', server.address());
});
只有到了 'listening' 事件被触发时候.才可以调用 server.address()
```



### 4. net.Socket 类
net.Socket可以被用户创建并直接与server通信。举个例子，它是通过net.createConnection()返回的，所以用户可以使用它来与server通信。

这是一个简单的TCP回声服务器在8124端口上监听连接的例子：

```
const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```
用 telnet测试:
```
$ telnet localhost 8124
```
想监听 /tmp/echo.sock 只需改最后三行为：
```
server.listen('/tmp/echo.sock', () => {
  console.log('server bound');
});
```
