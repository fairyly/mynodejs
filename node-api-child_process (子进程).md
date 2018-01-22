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

- child_process.exec(): 衍生一个 shell 并在 shell 上运行命令，当完成时会传入 stdout 和 stderr 到回调函数。
- child_process.execFile(): 类似 child_process.exec()，但直接衍生命令，且无需先衍生一个 shell。
- child_process.fork(): 衍生一个新的 Node.js 进程，并通过建立一个 IPC 通讯通道来调用一个指定的模块，该通道允许父进程与子进程之间相互发送信息。
- child_process.execSync(): child_process.exec() 的同步方法，会阻塞 Node.js 事件循环。
- child_process.execFileSync(): child_process.execFile() 的同步方法，会阻塞 Node.js 事件循环。

child_process.spawn()、child_process.fork()、child_process.exec() 和 child_process.execFile() 方法都遵循与其他 Node.js API 一样的惯用的异步编程模式

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
