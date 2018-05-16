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
redis 127.0.0.1:6379> SET name "runoob"
OK
redis 127.0.0.1:6379> GET name
"runoob"

> incr name //若 name 值加 1，如果 name 不是整数提示错误
--------------------------------
Hash（哈希）
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"

```
