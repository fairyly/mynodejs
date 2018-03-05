# Mongoose快速入门

目前安装的版本： 5.0.8

* 实例教程 1: https://cnodejs.org/topic/595d9ad5a4de5625080fe118


* GitHub: https://github.com/Automattic/mongoose
* website: http://mongoosejs.com/
* doc: http://mongoosejs.com/docs/populate.html

### 使用方法：

1. 安装好 mongodb 数据库后 启动数据库 介绍在 [mongodb 部分](https://github.com/fairyly/mynodejs/blob/gh-pages/mongodb%20%E9%83%A8%E5%88%86.md)

2. 安装 mongoose: npm i mongoose

3. 引入模块，连接 mongodb
  ```
    var mongoose = require('mongoose');
    mongoose.connect("mongodb://127.0.0.1:27017/test");
    var db = mongoose.connection;
    
    db.connection.on("error", function (error) {
	    console.log("数据库连接失败：" + error);
    });

    db.connection.on("open", function () {
	    console.log("------数据库连接成功！------");
    });
  ```
4. Schema简介
  - Schema：一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，  
  可以说是数据属性模型(传统意义的表结构)，又或着是"集合"的模型骨架。

  - 注：Schema定义集合结构（定义表的列）  

  ```
    // 定义一个Schema
    var TestSchema = new mongoose.Schema({
      name : { type:String },//属性name,类型为String
      age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
      time : { type:Date, default:Date.now },
      email: { type:String,default:''}
    });
  ```
5. Model–操作数据库
  ```
    //创建model,在内存中创建结构为TestSchema名为test1的集合
    var TestModel = db.model("test1", TestSchema );
  ```
6. Entity--给集合赋值
  ```
    var TestEntity = new TestModel({
  	name : "Lenka",
   	age  : 36,
   	email: "lenka@qq.com"
    });
    console.log(TestEntity.name); // Lenka
    console.log(TestEntity.age); // 36
  ```
7. //将test1写入到数据库中
  ```
    TestEntity.save(function(error,doc){
      if(error){
        console.log("error :" + error);
      }else{
        console.log(doc);
      }
    });
  ```

### 增删改查

1.查询
  ```
  find查询:obj.find(查询条件,callback);
  
  Model.find({ "age": 28 }, function (error, docs) {
    if(error){
      console.log("error :" + error);
    }else{
      console.log(docs); //docs: age为28的所有文档
    }
  });
  ```
2.model保存方法
  ```
    Model.create(文档数据, callback));
    
    TestModel.create({ name:"model\_create", age:26}, function(error,doc){
      if(error) {
        console.log(error);
      } else {
        console.log(doc);
      }
    });
  ```
3.entity保存方法

  ```
    Entity.save(文档数据, callback))
  
    TestEntity.save(function(error,doc){
      if(error){
        console.log("error :" + error);
      }else{
        console.log(doc);
      }
    });
  ```

4.数据更新
  ```
    obj.update(查询条件,更新对象,callback);
    
    var conditions = {name : 'test\_update'};
    var update = {$set : { age : 16 }};
    TestModel.update(conditions, update, function(error){
      if(error) {
        console.log(error);
      } else {
        console.log('Update success!');
      }
    });
  ```
5. 删除数据
  ```
    obj.remove(查询条件,callback);
    
    var conditions = { name: 'tom' };
    TestModel.remove(conditions, function(error){
      if(error) {
        console.log(error);
      } else {
        console.log('Delete success!');
      }
    });
  ```


* populate基本使用:https://segmentfault.com/a/1190000002727265

有很多场景都需要通过外键与另一张表建立关联，populate可以很方便的实现

语法:
```
path: 以空格分隔的引用字段的名称
select: 填充引用 document 中的哪些字段
match: 可选，指定附加的查询条件
model: 可选，指定引用的 model
options: 可选，指定附加的其他查询选项，如排序以及条数限制等等
```

使用方法:

首先，在建立模型时（schema）,需要指定关联字段：
```
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    name  : { type: String, unique: true },
});
var CommentSchema = new Schema({
    commenter : { type: Schema.Types.ObjectId, ref: 'User' },
    content   : String
});

仔细观察上述代码，有一个陌生字段“ref”，在这里ref表示commenter通过ObjectId字段关联了User
```

demo:
```

/填充所有 users 的 posts
User.find()
    .populate('posts', 'title', null, {sort: { title: -1 }})
    .exec(function(err, docs) {
        console.log(docs[0].posts[0].title); // post-by-aikin
    });

//填充 user 'luajin'的 posts
User.findOne({name: 'luajin'})
    .populate({path: 'posts', select: { title: 1 }, options: {sort: { title: -1 }}})
    .exec(function(err, doc) {
        console.log(doc.posts[0].title);  // post-by-luajin
    });

//这里的 populate 方法传入的参数形式不同，其实实现的功能是一样的，只是表示形式不一样。
```
