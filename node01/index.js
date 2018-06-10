require('colors');
console.log('smashing node'.rainbow);

// http 
var http = require('http');
var server = http.createServer(function(req,res){
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

})

server.listen(3000,function(){
	console.log(new Date() + 'Server is listening on port 3000')
})

// console.log('server is on http://127.0.0.1:3000',global)
console.log("==============================================")
// console.log(process)

console.log(__filename)
console.log(__dirname)
// 添加 uncaughtException 处理器
process.on('uncaughtException',function(err){
	console.error(err);
	process.exit(1);
})
// process.stdout.write('\033[33mEnter your choice: \033[339m')
// process.stdin.resume()
process.stdin.setEncoding('utf8');

// 输入参数
var num1, num2;
/*2：向屏幕输出，提示信息，要求输入num1*/
process.stdout.write('请输入num1的值：');
/*3：监听用户的输入*/
process.stdin.on('data', function (chunk) {
    if (!num1) {
        num1 = Number(chunk);
        /*4：向屏幕输出，提示信息，要求输入num2*/
        process.stdout.write('请输入num2的值');
    } else {
        num2 = Number(chunk);
        process.stdout.write('结果是：' + (num1 + num2));
    }
});

// net
var net = require('net');
net.createServer(function(con){
	con.on('error',function(err){
		console.log(err)
	})
}).listen(4000)

//EventEmitter

var EventEmitter = require('events').EventEmitter
var a = new EventEmitter;
a.on('event',function(res){
	console.log('res')
})
// a.emit('event')

// buffer
var mybuffer = new Buffer('==ii1j2i3hli23h','base64')
// console.log(mybuffer)


// fs
var fs = require('fs');
fs.writeFile('logo.png',mybuffer,function(err){
	if(err){console.log(err)}
	// console.log("save")
})


// websocket

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8087 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
  });

  ws.send('something');
});