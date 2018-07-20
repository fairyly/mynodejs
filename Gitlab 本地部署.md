# Gitlab 本地部署

<!-- 

      *.                   *
     ***                  ***
    *****                *****
   .******              ******.
   ********            ********
  ,,,,,,,,,***********,,,,,,,,,
 ,,,,,,,,,,,*********,,,,,,,,,,,
 .,,,,,,,,,,,*******,,,,,,,,,,,,
       ,,,,,,,*****,,,,,,,,
        ,,,,,,****,,,,,,
          .,,,****,,,,
            ,,***,,
              ,*,
-->

## ubantu 18.04

安装步骤 : https://about.gitlab.com/installation/#ubuntu

>安装并配置必要的依赖关系

```
sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates
```
接下来，安装Postfix发送通知邮件。如果您想使用其他解决方案发送电子邮件，请跳过此步骤并在安装GitLab后配置外部SMTP服务器。

sudo apt-get install -y postfix

在Postfix安装期间，可能会出现一个配置屏幕。选择“Internet站点”并按回车

1  curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash


2  sudo apt-get install gitlab-ce（网速大部分很慢，运气好达到200k）

         报错Unable to locate package gitlab-ce

解决方法

a) 修改 /etc/apt/sources.list.d/gitlab_gitlab-ce.list
```
原来
deb https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ zesty main
deb-src https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ zesty main
改成
deb https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ xenial main
deb-src https://packages.gitlab.com/gitlab/gitlab-ce/ubuntu/ xenial main
```
b)  sudo apt-get update

c)  sudo apt-get install gitlab-ce

3  vim /etc/gitlab/gitlab.rb  
- 修改external_url   'http://localhost:90'（ip，参照本人虚拟机桥接设置博文设置，保证虚拟机访问外网和局域网其他机器访问虚拟机）
```
#external_url 'http://ubuntu'  #将ubuntu换成自己的IP地址

#external_url 'http://当前电脑的IP地址'  #下面是我的IP地址

external_url 'http://192.168.220.131'
```
安装后HTTPS需要额外的配置: https://docs.gitlab.com/omnibus/settings/nginx.html#enable-https

4  sudo gitlab-ctl reconfigure

5  gitlab-ctl restart 

## 参考资料
- https://blog.csdn.net/zerokkqq/article/details/79728527
- https://blog.csdn.net/u012838045/article/details/80881243
- https://www.cnblogs.com/wangkevin5626/p/7595070.html
- https://about.gitlab.com/installation/#ubuntu
- https://docs.gitlab.com/omnibus/settings/nginx.html#enable-https
- 清华大学开源软件镜像站: https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/ubuntu/pool/xenial/main/g/gitlab-ce/
- http://ccimage.cn/2018-05/ubuntu18-04-install-gitlab-chinese-mirror.html
