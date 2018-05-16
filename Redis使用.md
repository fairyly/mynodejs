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
```
