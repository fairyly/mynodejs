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
