# npm install 报错：

## 1、npm install 报错：
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
## 2: windows npm install Can't find Python executable "e:\python2.7"

```
解决办法：
1. 安装python ， 设置环境变量 ：cmd --> path='%path%';E:\Python27（pyhon本地安装路径）

2. npm config set python "E:\Python27\python.exe"

```


## 3.在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关。 
```
MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”。要解决此问题， 
1) 安装 .NET Fram 
ework 2.0 SDK；2) 安装 Microsoft Visual Studio 2005；或 3) 如果将该组件安装到了 
其他位置，请将其位置添加到系统 
路径中。 [G:\nodejs\moviesite\node_modules\bcrypt\build\binding.sln] 
gyp ERR! build error

如图： 



需要安装Microsoft Visual Studio Express 2013 for Windows Desktop 
```

## Windows 10 64bit MSBUILD : error MSB4132: 无法识别工具版本“2.0”。可用的工具版本为 "4.0"。

- 参考：https://www.whidy.net/windows-10-64bit-nodejs-error-msbuild-error-msb4132.html
- https://github.com/chjj/pty.js/issues/60

```
npm config set msvs_version 2012 --global
```



## Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 10.x
```
Found bindings for the following environments:
  - Windows 64-bit with Node.js 8.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass --force` to build the binding for your current environment.
```

解决：
```
npm rebuild node-sass
npm update
```
