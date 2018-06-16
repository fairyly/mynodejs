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
	// res.end('hello');
	// throw new Error('错误不会被捕捉');

})

// server.listen(3000,function(){
// 	console.log(new Date() + 'Server is listening on port 3000')
// })

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
// process.stdout.write('请输入num1的值：');
/*3：监听用户的输入*/
process.stdin.on('data', function (chunk) {
    if (!num1) {
        num1 = Number(chunk);
        /*4：向屏幕输出，提示信息，要求输入num2*/
        // process.stdout.write('请输入num2的值');
    } else {
        num2 = Number(chunk);
        // process.stdout.write('结果是：' + (num1 + num2));
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

wss.on('close', function close() {
  console.log('disconnected');
});


// socket.io

var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('news', function(data){
  	console.log('io')
  });

  client.emit('news',{"hello":"world"});

  client.on('disconnect', function(){
	console.log('io')
  });
});

// mongodb
var express = require('express');
var mongodb = require('mongodb');
var path = require('path');
const config = require('config-lite')(__dirname);
const pkg = require('./package');


var app = express();
// 中间件
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.session({secret:'my secret'}))

// 模板引擎
app.set('view engine','jade');

// 放模板文件的目录
console.log(__dirname,__filename,path.join(__dirname,'public'))
app.set('views',path.join(__dirname,'views'))


// / 设置静态文件目录
app.use(express.static(path.join(__dirname,'public')))


// 设置模板全局常量，从package.json 取得的参数
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}


app.get('/',function(req,res){
  res.render('index')
})



app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    // 插入一条数据
    insertOneData(dbo,function(){
      db.close()
    });
    // 插入多条数据
    insertManyData(dbo,function(){
       db.close()
    })

});

// 插入一条数据 insertOne（）
var insertOneData = function(db,callback){
  var myobj = { name: "test", url: "www.runoob" };
    db.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        callback();
    });
}

// 要插入多条数据可以使用 insertMany()
var insertManyData = function(db,callback){
  var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    db.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        callback();
    });
}
