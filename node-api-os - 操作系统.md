# os - 操作系统

### 1.os.EOL
os.EOL属性是一个常量，返回当前操作系统的换行符（Windows系统是\r\n，其他系统是\n）

```
const fs = require(`fs`);

// bad
fs.readFile('./myFile.txt', 'utf8', (err, data) => {
  data.split('\r\n').forEach(line => {
    // do something
  });
});

// good
const os = require('os');
fs.readFile('./myFile.txt', 'utf8', (err, data) => {
  data.split(os.EOL).forEach(line => {
    // do something
  });
});
```

### 2.os.arch()
os.arch()方法返回一个字符串, 表明Node.js 二进制编译 所用的 操作系统CPU架构.

现在可能的值有: 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', 'x64', 和 'x86'.

等价于 process.arch.

```
require(`os`).arch()
// "x64"
```
### 3.os.constants

```
返回一个包含错误码,处理信号等通用的操作系统特定常量的对象. 现在, 这些特定的常量的定义被描述在OS Constants
```

### 4.os.cpus()

os.cpus() 方法返回一个对象数组, 包含每个逻辑 CPU 内核的信息.

### 5.os.endianness()

os.endianness()方法返回一个字符串,表明Node.js二进制编译环境的字节顺序.

### 6.os.homedir()

os.homedir() 方法以字符串的形式返回当前用户的home目录

### 7.os.networkInterfaces()

os.networkInterfaces()方法返回一个对象,包含只有被赋予网络地址的网络接口.

```
被赋予网络地址的对象包含的属性:

address <string> 被赋予的 IPv4 或 IPv6 地址
netmask <string> IPv4 或 IPv6 子网掩码
family <string> IPv4 或 IPv6
mac <string> 网络接口的MAC地址
internal <boolean> 如果 网络接口是loopback或相似的远程不能用的接口时, 值为true,否则为false
scopeid <number> IPv6 数字领域识别码 (只有当 family 是IPv6时可用)
cidr <string> 以 CIDR 表示法分配的带有路由前缀的 IPv4 或 IPv6 地址。如果 netmask 参数不可用，则该属性是 null
```

### 8.os.platform()

os.platform() 方法返回一个字符串, 指定Node.js编译时的操作系统平台

当前可能的值有:
```
'aix'
'darwin'
'freebsd'
'linux'
'openbsd'
'sunos'
'win32'
等价于 process.platform.
```

```
下面例子列出当前系列的所有IP地址。


var os = require('os');
var interfaces = os.networkInterfaces();

for (item in interfaces) {
  console.log('Network interface name: ' + item);
  for (att in interfaces[item]) {
    var address = interfaces[item][att];

    console.log('Family: ' + address.family);
    console.log('IP Address: ' + address.address);
    console.log('Is Internal: ' + address.internal);
    console.log('');
  }
  console.log('==================================');
}

```
