# mongodb  目前是用 3.0 api

* nodejs mangodb 3.0 api:http://mongodb.github.io/node-mongodb-native/3.0/api/

* 1.在mongodb上使用的GUI工具
  ```
  知乎回答：https://www.zhihu.com/question/31903748
  1. mongodb 推荐的 mongodb compass ,安装时候会看到让勾选安装
  2. NoSQL Manager for MongoDB Professional：https://www.mongodbmanager.com/download
  3.pycharm该插件介绍:JetBrains Plugin Repository :: Mongo Plugin
    https://plugins.jetbrains.com/plugin/7141-mongo-plugin
  4.MongoChef:https://studio3t.com/
  
  * mongodb 可视化管理工具: 
  - RoboMongo: https://robomongo.org/
  - NoSQL Manager for MongoDB: https://www.mongodbmanager.com/
  - MongoChef: https://studio3t.com/

  ```
* 2.mongodb 下载安装
  - 下载地址：https://www.mongodb.com/download-center?jmp=nav#enterprise
  - 安装完成后：新建目录D:\mongodb\data ,D:\mongodb\logs  
  - 配置了环境变量:mongod --dbpath D:\mongodb\data  
  - 运行 MongoDB 服务器: D:\mongodb\bin>mongod --dbpath D:\mongodb\data
  - 设置Windows 服务：
    ```
        新建文件mongo.config;
        用记事本打开mongo.config输入：
        dbpath=D:\mongodb\data\db
        logpath=D:\mongodb\data\log\mongo.log 
        
        用管理员身份打开cmd命令行，进入D:\mongodb\bin目录，输入如下的命令
        D:\momgodb\bin>mongod --config D:\mongodb\mongo.config 
        有人提醒改为如下：
        mongod --config D:\mongodb\mongo.config --install --serviceName "MongoDB"
    ```
  - net start MongoDB服务无法启动，windows提示发生服务特定错误：100
    ```
    1.找到你数据库文件夹中的这两个文件 mongod.lock storage.bson
    2.删掉他们
    ```
  - 命令启动批处理  
    ```
    @echo off
    color 0a 
    echo "connect mongodb"
    title mongodb connect
    d: 
    cd D:\mongodb\bin 
    mongod --dbpath D:\mongodb\data
    ```
* 1.常用的命令
```
show dbs    显示数据库列表
use dbname    进入dbname数据库，大小写敏感，没有这个数据库也不要紧
show collections    显示数据库中的集合，相当于表格
```
* 2.创建&新增

以下都是 node-mongodb-native 

多种中间件可以用于连接node.js与MongoDB，目前比较常用的Mongoose。

首先，在项目目录将Mongoose安装为本地模块。

* nodejs mongodb api:http://mongodb.github.io/node-mongodb-native/3.0/api/index.html

  遇到问题：TypeError: db.collection is not a function  3.0以上版本会报错 需要使用 var mydb = db.db('your dbname')  
  之后在连接数据库回调中加入 var mydb = db.db('myDatabaseNameAsAString');  
  参考：https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function  
        https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
```
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017';


var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        console.dir(doc);
      } else {
        callback();
      }
   });
};

// 连接数据库
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  console.log('Connected correctly to server.',db);
  var mydb = database.db('test');
  // 插入数据
  insertDocument(mydb, function() {
    database.close();
  });
  // 查询数据
  findRestaurants(mydb, function() {
      database.close();
  });
});
```
* 3.删除
```
删除符合条件的所有文档
var removeRestaurants = function(db, callback) {
   db.collection('restaurants').deleteMany(
      { "borough": "Manhattan" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

删除单一文档。

db.collection('restaurants').deleteOne(
      { "borough": "Queens" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
   
 删除所有文档。

db.collection('restaurants').deleteMany( {}, function(err, results) {
      console.log(results);
      callback();
   });

删除整个集合。

db.collection('restaurants').drop( function(err, response) {
      console.log(response)
      callback();
   });
```
* 4.查找
```
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        console.dir(doc);
      } else {
        callback();
      }
   });
};
```
* 5.更新
```
const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}
```


### Mongoose
多种中间件可以用于连接node.js与MongoDB，目前比较常用的Mongoose。

首先，在项目目录将Mongoose安装为本地模块。
```
npm install mongoose --save
```

然后，就可以在node.js脚本中连接MongoDB数据库了。
```
var mongoose = require('mongoose');

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/mydatabase');
```
注意，运行上面这个脚本时，必须确保MongoDB处于运行中。

数据库连接后，可以对open和error事件指定监听函数。
```
var db = mongoose.connection;

db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});
```
* mongoose.Schema方法用来定义数据集的格式（schema），mongoose.model方法将格式分配给指定的数据集。

```
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name : String,
  age : Number,
  DOB : Date,
  isAlive : Boolean
});

var User = mongoose.model('User', userSchema);

var arvind = new User({
  name : 'Arvind',
  age : 99,
  DOB : '01/01/1915',
  isAlive : true
});

arvind.save(function (err, data) {
  if (err){
    console.log(err);
  } else {
    console.log('Saved : ', data );
  }
});
```


## 参考
- [mongodb---quick-start](http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/)
