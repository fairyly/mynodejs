# npm install 报错：

1、npm install 报错：
```
1.NPM Unexpected end of JSON input while parsing near
2.npm ERR! A complete log of this run can be found in:
```
解决办法：

首先：

更新`npm`版本命令：

npm install npm -g 要记住全局更新

淘宝镜像命令：cnpm install npm -g 淘宝镜像会比较快

再查看一下npm版本：npm -v



其次:
```
npm install --registry=https://registry.npm.taobao.org
```
最后：
```
npm cache clean --force
```
2: windows npm install Can't find Python executable "e:\python2.7"

```
解决办法：
1. 安装python ， 设置环境变量 ：cmd --> path='%path%';E:\Python27（pyhon本地安装路径）

2. npm config set python "E:\Python27\python.exe"

```
