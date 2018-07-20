# Gitlab 本地部署

## ubantu 18.04

安装步骤 

1  curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash


2  sudo apt-get install gitlab-ee（网速大部分很慢，运气好达到200k）

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

c)  sudo apt-get install gitlab-ee

3  vim /etc/gitlab/gitlab.rb  
- 修改external_url   'http://localhost:90'（ip，参照本人虚拟机桥接设置博文设置，保证虚拟机访问外网和局域网其他机器访问虚拟机）
```
#external_url 'http://ubuntu'  #将ubuntu换成自己的IP地址

#external_url 'http://当前电脑的IP地址'  #下面是我的IP地址

external_url 'http://192.168.220.131'
```

4  sudo gitlab-ctl reconfigure

5  gitlab-ctl restart 

## 参考资料
- https://blog.csdn.net/zerokkqq/article/details/79728527
- https://blog.csdn.net/u012838045/article/details/80881243
