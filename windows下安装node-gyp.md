# windows下安装node-gyp

什么是node-gyp?
```
gyp是一种根据c++源代码编译的工具，node-gyp就是为node编译c++扩展的时候使用的编译工具。
最近在研究native script需要使用到node-gyp，遇到一些问题所以将解决方案记录在这里。
```
windows下的安装方法
```
这是为node编译c++扩展的工具所以你肯定是有node环境的，这时，使用npm全局安装即可。

npm install -g node-gyp
到这里我们还不可以进行编译，因为node-gyp需要依赖python2.7和微软的vc++构建工具来进行编译，这在linux系统上没问题，因为linux上都默认安装了，但是windows操作系统在默认情况下不会安装python2.7和vc++构建工具。
```

为node-gyp配置安装python2.7以及VC++ build Tools依赖

### 方法一
同样使用npm
```
npm install --global --production windows-build-tools
直接在cmd当中输入上面的指令就可以了，但是这种方法是从外国的服务器上下载资源，速度会相当的慢。所以国内的用户我推荐第二种方法
```
### 方法二

方法二会相对麻烦一点
```
首先，Visual C++ Build Tools从微软官方网站下载vc++构建工具，安装的时候使用默认安装就可以了，这个步骤比较简单。和安装vs一样只需要等待就可以了。

然后，我们去python的官方网站下载python2.7（如果服务器软件不支持python2.7可能都无从下载了。）python官方网站下载python2.7.然后默认安装，安装的时候会有一个选项是添加PATH可以勾选，但是安装完以后还是要去环境变量里面查看一下是否添加了。

根据安装包安装好以后配置环境变量，如果之前安装过python3的话，可以直接进入到python3的文件夹当猴子那个将python.exe改名为python3.exe，以后在cmd当中使用的时候直接输入python进入的是python2.7，输入python3进入的就是python3了。这里对环境变量不太了解的可以百度一下，很简单。

配置依赖
依赖安装好了以后要配置一下依赖，让node-gyp可以找到依赖方法很简单。
打开cmd输入：

npm config set python python2.7
配置好python

npm config set msvs_version 2015
配置好c++构建工具

如果不出意外的话我们就可以用node-gyp进行构建了。

如果出现问题可以参考node-gyp的github主页。

总结
native script在构建依赖环境的时候需要使用到node-gyp自动安装的时候会自动下载和安装node-gyp但是链接国外的网站实在太慢了，所以自己去查了资料手动安装，还是迅雷下载块。最后将经验记录在此。
```
作者：ppmoon
链接：https://www.jianshu.com/p/2b831714bbff
來源：简书
