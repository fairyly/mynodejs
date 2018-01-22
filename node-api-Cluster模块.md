# Cluster模块 （集群）

cluster模块允许设立一个主进程和若干个worker进程，由主进程监控和协调worker进程的运行。  
worker之间采用进程间通信交换消息，cluster模块内置一个负载均衡器，采用Round-robin算法协调各个worker进程之间的负载。  
运行时，所有新建立的链接都由主进程完成，然后主进程再把TCP连接分配给指定的worker进程  

### 1.基本用法
```
var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster){
  for (var i = 0, n = os.cpus().length; i < n; i += 1){
    cluster.fork();
  }
} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}

先判断当前进程是否为主进程（cluster.isMaster）

上面这段代码有一个缺点，就是一旦work进程挂了，主进程无法知道。为了解决这个问题，可以在主进程部署online事件和exit事件的监听函数。

var cluster = require('cluster');

if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
}
```

### 1.2.worker对象

worker对象是cluster.fork()的返回值，代表一个worker进程。

它的属性和方法如下。

（1）worker.id

worker.id返回当前worker的独一无二的进程编号。这个编号也是cluster.workers中指向当前进程的索引值。

（2）worker.process

所有的worker进程都是用child_process.fork()生成的。child_process.fork()返回的对象，就被保存在worker.process之中。通过这个属性，可以获取worker所在的进程对象。

（3）worker.send()

该方法用于在主进程中，向子进程发送信息。
```
if (cluster.isMaster) {
  var worker = cluster.fork();
  worker.send('hi there');
} else if (cluster.isWorker) {
  process.on('message', function(msg) {
    process.send(msg);
  });
}
```

### 2.cluster模块的属性与方法

- isMaster，isWorker
isMaster属性返回一个布尔值，表示当前进程是否为主进程。这个属性由process.env.NODE_UNIQUE_ID决定，如果process.env.NODE_UNIQUE_ID为未定义，就表示该进程是主进程。

isWorker属性返回一个布尔值，表示当前进程是否为work进程。它与isMaster属性的值正好相反。

- fork()  
fork方法用于新建一个worker进程，上下文都复制主进程。只有主进程才能调用这个方法。

该方法返回一个worker对象。

- kill()  
kill方法用于终止worker进程。它可以接受一个参数，表示系统信号。

如果当前是主进程，就会终止与worker.process的联络，然后将系统信号法发向worker进程。如果当前是worker进程，就会终止与主进程的通信，然后退出，返回0。

在以前的版本中，该方法也叫做 worker.destroy() 。

- listening事件  
worker进程调用listening方法以后，“listening”事件就传向该进程的服务器，然后传向主进程。

该事件的回调函数接受两个参数，一个是当前worker对象，另一个是地址对象，包含网址、端口、地址类型（IPv4、IPv6、Unix socket、UDP）等信息。这对于那些服务多个网址的Node应用程序非常有用。
```
cluster.on('listening', function (worker, address) {
  console.log("A worker is now connected to " + address.address + ":" + address.port);
});
```

### 完整的实例
```
先是主进程的代码master.js。

var cluster = require('cluster');

console.log('started master with ' + process.pid);

// 新建一个worker进程
cluster.fork();

process.on('SIGHUP', function () {
  console.log('Reloading...');
  var new_worker = cluster.fork();
  new_worker.once('listening', function () {
    // 关闭所有其他worker进程
    for(var id in cluster.workers) {
      if (id === new_worker.id.toString()) continue;
      cluster.workers[id].kill('SIGTERM');
    }
  });
});
上面代码中，主进程监听SIGHUP事件，如果发生该事件就关闭其他所有worker进程。之所以是SIGHUP事件，是因为nginx服务器监听到这个信号，会创造一个新的worker进程，重新加载配置文件。另外，关闭worker进程时，主进程发送SIGTERM信号，这是因为Node允许多个worker进程监听同一个端口。

下面是worker进程的代码server.js。

var cluster = require('cluster');

if (cluster.isMaster) {
  require('./master');
  return;
}

var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
  res.send('ha fsdgfds gfds gfd!');
});

http.createServer(app).listen(8080, function () {
  console.log('http://localhost:8080');
});


使用：
$ node server.js

然后，向主进程连续发出两次SIGHUP信号。

$ kill -SIGHUP 10538
$ kill -SIGHUP 10538

向主进程发出SIGTERM信号，关闭主进程。

$ kill 10538
```


### 4.PM2模块

PM2模块是cluster模块的一个包装层。它的作用是尽量将cluster模块抽象掉，让用户像使用单进程一样，部署多进程Node应用。
```
// app.js
var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world");
}).listen(8080);
```
上面代码是标准的Node架设Web服务器的方式，然后用PM2从命令行启动这段代码。
```
$ pm2 start app.js -i 4

# 重启所有worker进程
$ pm2 reload all


每个worker进程都有一个id，可以用下面的命令查看单个worker进程的详情。

$ pm2 show <worker id>

关闭worker进程的时候，可以部署下面的代码，让worker进程监听shutdown消息。一旦收到这个消息，进行完毕收尾清理工作再关闭。

process.on('message', function(msg) {
  if (msg === 'shutdown') {
    close_all_connections();
    delete_logs();
    server.close();
    process.exit(0);
  }
});
```
