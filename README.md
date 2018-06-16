# mynodejs
mynodejs

```
  $ git clone https://github.com/fairyly/mynodejs.git -b 了不起的Node.js
```


### 01 

Node：单线程

目前API: http://nodejs.cn/api/

事件轮询： Node 先去注册事件，随后不停的询问内核这些事件是否分发，当事件分发时，  
  对应的回调函数就会触发，然后继续执行下去，如果没有事件触发，则继续执行其他代码，  
  直到有新事件时，再去执行对应的回调函数

- http
```
// 创建 http 服务器
var http = require('http');
http.createServer(function(req,res){
	var buf = '';
	req.on('data',function(data){
		bud += data;
		console.log(data)
	})

	req.on('end',function(){
		console.log('接收完毕')
	})
	res.writeHead(200,{});
	res.end('hello');
	// throw new Error('错误不会被捕捉');


}).listen(3000)

// 请求

http.request({
	host: '127.0.0.1',
	port: 3000,
	url: '/',
	method: 'get'
	},function(res){
		res.setEncoding('utf8');
		var body = '';
		res.on('data',function(chunk){
			body += chunk
			})
		res.on('end',function(){

			})
	}
)
```

- superagent: http 方面的库，可以发起 get 或 post 请求
```
var request = require('superagent')
request
   .post('/api/pet')
   .send({ name: 'Manny', species: 'cat' })
   .set('X-API-Key', 'foobar')
   .set('Accept', 'application/json')
   .then(function(res) {
      alert('yay got ' + JSON.stringify(res.body));
   });
```


- get colors in your node.js console :在 node 控制台打印颜色
  - colors: https://github.com/Marak/colors.js

'\033[33mEnter your choice: \033[339m': (ANSI转义码)让文本呈现颜色

用户输入： process.stdout.write()
监听用户的输入: process.stdin.on('data', function (chunk) {})
获取当前工作目录： process.cwd();


- TCP：面向连接的
  - 面向字节
  - 可靠性
  - 流控制
  - 拥堵控制
  - 

- webSocket
```
// server
npm install --save ws

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8087 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
  });

  ws.send('something');
});

// client
 <script>
        var ws = new WebSocket('ws://localhost:8087');
        ws.onopen = function(){
            ping();
        }

        ws.onmessage = function(ev) {
            console.log("get msg: " + ev.data)
            ping()
        }

        function ping() {
            lastmsg = +new Date();
            ws.send('ping'+ lastmsg)
        }
</script>


```

### mongoDB
