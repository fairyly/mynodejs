# child_process (子进程)

* 阮一峰总结教程：http://javascript.ruanyifeng.com/nodejs/child-process.html

* http://nodejs.cn/api/child_process.html

child_process模块用于新建子进程。子进程的运行结果储存在系统缓存之中（最大200KB），等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果。

* child_process 模块提供了衍生子进程的功能
  ```
  const { spawn } = require('child_process');
  const ls = spawn('ls', ['-lh', '/usr']);

  ls.stdout.on('data', (data) => {
    console.log(`输出：${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`错误：${data}`);
  });

  ls.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
  });
  ```

### 1.exec()

exec方法用于执行bash命令，它的参数是一个命令字符串
```
var exec = require('child_process').exec;

var ls = exec('ls -l', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
  }
  console.log('Child Process STDOUT: ' + stdout);
});
```
