# Redis使用

## 1.安装（windows）

- 下载： https://github.com/ServiceStack/redis-windows/tree/master/downloads
- 可以修改redis.windows.conf文件，设置maxmemory 大小 ，设置redis密码 

## 2.启动Redis
- 进入 Redis 目录，直接在命令界面 I:\Redis-x64-3.2.100>redis-server.exe

- 打开 Redis 客户端：I:\Redis-x64-3.2.100>redis-cli.exe
- 也可以使用 redis desktop manager:https://redisdesktop.com/
- 将redis加入到windows的服务中（都是两个-）
```
redis-server –service-install redis.windows.conf –loglevel verbose

//通过客户端来关闭redis服务端
127.0.0.1:6379> shutdown 
127.0.0.1:6379>
```

## 基础知识

Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

打开Redis客户端：
```
字符串操作：

redis 127.0.0.1:6379> SET name "runoob"
OK
redis 127.0.0.1:6379> GET name
"runoob"

> incr name //若 name 值加 1，如果 name 不是整数提示错误
--------------------------------
Hash（哈希）操作：
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"


List（列表）操作：
redis 127.0.0.1:6379> lpush runoob redis
(integer) 1
redis 127.0.0.1:6379> lpush runoob mongodb
(integer) 2
redis 127.0.0.1:6379> lpush runoob rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange runoob 0 10
1) "rabitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>


Set（集合）：
Redis的Set是string类型的无序集合。

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。

sadd 命令
添加一个 string 元素到 key 对应的 set 集合中，成功返回1，如果元素已经在集合中返回 0，如果 key 对应的 set 不存在则返回错误。

sadd key member
实例
redis 127.0.0.1:6379> sadd runoob redis
(integer) 1
redis 127.0.0.1:6379> sadd runoob mongodb
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabitmq
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabitmq
(integer) 0
redis 127.0.0.1:6379> smembers runoob

1) "redis"
2) "rabitmq"
3) "mongodb"


zset(sorted set：有序集合)：
Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

zset的成员是唯一的,但分数(score)却可以重复。

zadd 命令
添加元素到集合，元素在集合中存在则更新对应score

zadd key score member 
实例
redis 127.0.0.1:6379> zadd runoob 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 0
redis 127.0.0.1:6379> > ZRANGEBYSCORE runoob 0 1000
1) "mongodb"
2) "rabitmq"
3) "redis"
```
