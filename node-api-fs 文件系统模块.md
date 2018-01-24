# fs 模块

* Node.js的__dirname，__filename，process.cwd()，./的一些坑 :https://github.com/jawil/blog/issues/18

```
说一下这几个路径的意思：

__dirname：    获得当前执行文件所在目录的完整目录名
__filename：   获得当前执行文件的带有完整绝对路径的文件名
process.cwd()：获得当前执行node命令时候的文件夹目录名 
./：           文件所在目录

写这些代码，看看输出是什么：

const path = require('path')
console.log('__dirname：', __dirname)
console.log('__filename：', __filename)
console.log('process.cwd()：', process.cwd())
console.log('./：', path.resolve('./'))
```

