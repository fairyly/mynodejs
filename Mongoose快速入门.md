# Mongoose快速入门

* https://cnodejs.org/topic/595d9ad5a4de5625080fe118

### 使用方法：

1. 安装好 mongodb 数据库后 启动数据库 介绍在 [mongodb 部分](https://github.com/fairyly/mynodejs/blob/gh-pages/mongodb%20%E9%83%A8%E5%88%86.md)

2. 安装 mongoose: npm i mongoose

3. 引入模块，连接 mongodb
  ```
    var mongoose = require('mongoose');

    var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
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
