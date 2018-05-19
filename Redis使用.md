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

##  keys 命令
```
del key: 用于在 key 存在时删除 key
ep: 
set name 'test'
del name

exist name: 用于检查给定 key 是否存在



```

## 发布订阅

```
subscribe chanel : 订阅给定的一个或多个频道的信息
ep: 
subscribe chat

重新开启个 redis 客户端，然后在同一个频道 redisChat 发布两次消息，订阅者就能接收到消息。

publish chat '发布信息'


```
## Redis 事务
```
Redis 事务可以一次执行多个命令， 并且带有以下两个重要的保证：

批量操作在发送 EXEC 命令前被放入队列缓存。
收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。


一个事务从开始到执行会经历以下三个阶段：

开始事务。
命令入队。
执行事务。


先以 MULTI 开始一个事务， 然后将多个命令入队到事务中， 最后由 EXEC 命令触发事务， 一并执行事务中的所有命令：

redis 127.0.0.1:6379> MULTI

redis 127.0.0.1:6379> SET book-name "Mastering C++ in 21 days"
QUEUED

redis 127.0.0.1:6379> GET book-name
QUEUED

redis 127.0.0.1:6379> EXEC
```


# Redis 脚本

```
Eval 命令的基本语法如下：

redis 127.0.0.1:6379> EVAL script numkeys key [key ...] arg [arg ...]
```

# 切换数据库

```
redis 127.0.0.1:6379> SELECT 1                # 使用 1 号数据库
```
