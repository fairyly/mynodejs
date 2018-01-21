# mongodb


* 1.在mongodb上使用的GUI工具
  ```
  知乎回答：https://www.zhihu.com/question/31903748
  1. mongodb 推荐的 mongodb compass ,安装时候会看到让勾选安装
  2. NoSQL Manager for MongoDB Professional：https://www.mongodbmanager.com/download
  3.pycharm该插件介绍:JetBrains Plugin Repository :: Mongo Plugin
    https://plugins.jetbrains.com/plugin/7141-mongo-plugin
  4.MongoChef:https://studio3t.com/
  ```
* 2.mongodb 下载安装
  - 下载地址：https://www.mongodb.com/download-center?jmp=nav#enterprise
  - 安装完成后：新建目录I:\momgodb\data ,I:\momgodb\logs  
  - 配置了环境变量:mongod --dbpath I:\momgodb\data 
  - 设置Windows 服务：
    ```
        新建文件mongo.config;
        用记事本打开mongo.config输入：
        dbpath=D:\mongodb\data\db
        logpath=D:\mongodb\data\log\mongo.log 
        
        用管理员身份打开cmd命令行，进入D:\mongodb\bin目录，输入如下的命令
        i:\momgodb\bin>mongod --config D:\mongodb\mongo.config 
        有人提醒改为如下：
        mongod --config i:\momgodb\mongo.config --install --serviceName "MongoDB"
    ```

* 1.常用的命令
```
show dbs    显示数据库列表
use dbname    进入dbname数据库，大小写敏感，没有这个数据库也不要紧
show collections    显示数据库中的集合，相当于表格
```
* 2.创建&新增
```
db.users.save({"name":"lecaf"})    创建了名为users的集合，并新增了一条{"name":"lecaf"}的数据
db.users.insert({"name":"ghost", "age":10})    在users集合中插入一条新数据，，如果没有users这个集合，mongodb会自动创建
save()和insert()也存在着些许区别：若新增的数据主键已经存在，insert()会不做操作并提示错误，而save() 则更改原来的内容为新内容。
存在数据：{ _id : 1, " name " : " n1 "} ，_id是主键
insert({ _id : 1, " name " : " n2 " })    会提示错误
save({ _id : 1, " name " : " n2 " })     会把 n1 改为  n2 ，有update的作用。
```
* 3.删除
```
db.users.remove()    删除users集合下所有数据
db.users.remove({"name": "lecaf"})    删除users集合下name=lecaf的数据
db.users.drop()或db.runCommand({"drop","users"})    删除集合users
db.runCommand({"dropDatabase": 1})    删除当前数据库
```
* 4.查找
```
db.users.find()    查找users集合中所有数据
db.users.findOne()    查找users集合中的第一条数据
```
* 5.修改
```
db.users.update({"name":"lecaf"}, {"age":10})    修改name=lecaf的数据为age=10，第一个参数是查找条件，第二个参数是修改内容，除了主键，其他内容会被第二个参数的内容替换，主键不能修改
```
