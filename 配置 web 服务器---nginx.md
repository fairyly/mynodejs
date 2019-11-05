# 配置 web 服务器---nginx

nginx:

centos 默认配置文件位置:/etc/nginx

找到配置文件位置：nginx -t //找到配置文件位置的命令
```
cd /etc/nginx
```

编辑配置文件使用 vim,
未安装时使用 yum 安装：yum install vim
```
vim nginx.conf 
```

刚进来时候只读模式，
  - 按住 shift+: 键:  进入视图模式
  - 按住 i 键: 进入 insert 模式（编辑模式），按下 i, o, a 等字符就可以进入输入模式
  - 保存并退出：如果在编辑模式，按住 shift+: ,输入 wq (保存并退出)
  - 退出：q
  - 强制不保存退出：q!
  - 强制保存退出：wq!

https://github.com/fairyly/php_study/blob/dev/Linux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.md

- 需要修改的地方
```
user ngin 改为 user root
http> server>location
```

## ssh 连接
```
ssh username@hostip   ssh yhq@192.168.235.130
```
## scp

- Linux scp命令用于Linux之间复制文件和目录。
```
scp [可选参数] file_source file_target 
```
- 参数说明：

```
-1： 强制scp命令使用协议ssh1
-2： 强制scp命令使用协议ssh2
-4： 强制scp命令只使用IPv4寻址
-6： 强制scp命令只使用IPv6寻址
-B： 使用批处理模式（传输过程中不询问传输口令或短语）
-C： 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
-p：保留原文件的修改时间，访问时间和访问权限。
-q： 不显示传输进度条。
-r： 递归复制整个目录。
-v：详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
-c cipher： 以cipher将数据传输进行加密，这个选项将直接传递给ssh。
-F ssh_config： 指定一个替代的ssh配置文件，此参数直接传递给ssh。
-i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。
-l limit： 限定用户所能使用的带宽，以Kbit/s为单位。
-o ssh_option： 如果习惯于使用ssh_config(5)中的参数传递方式，
-P port：注意是大写的P, port是指定数据传输用到的端口号
-S program： 指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。
```

- 从本地复制到远程
  - 命令格式：scp -r local_folder remote_username@remote_ip:remote_folder 
  - 进入需要上传的本地文件夹 输入命令：scp -r ./*  root@47.94.255.230:/root/www



- 查看nginx进程：
```
ps -ef|grep nginx
```

- nginx 服务器重启命令，关闭
- nginx -s reload ：修改配置后重新加载生效
- nginx -s reopen ：重新打开日志文件
- nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

- 关闭nginx：
  - nginx -s stop :快速停止nginx
  - quit ：完整有序的停止nginx

- 其他的停止nginx 方式：
```
ps -ef | grep nginx

kill -QUIT 主进程号 ：从容停止Nginx
kill -TERM 主进程号 ：快速停止Nginx
pkill -9 nginx ：强制停止Nginx
```
 

- 启动nginx:
  - nginx -c /path/to/nginx.conf

- 平滑重启nginx：
  - kill -HUP 主进程号
