# node websocket

```
服务端：
// 安装 websocket 库
npm i ws

新建文件 server.js
var app = require('express');
var server = require('http').Server(app);
var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {

    console.log('server: receive connection.');

    ws.on('message', function incoming(message) {

        console.log('server: received: %s', message);

    });


    ws.send('world');

});

客户端：
.建立一个client.html
var ws = new WebSocket('ws://localhost:8080');
  ws.onopen = function() {
    console.log('ws onopen');
    ws.send('from client: hello');
  };

  ws.onmessage = function (e) {
    console.log('ws onmessage');
    console.log('from server: ' + e.data);
  };
```
