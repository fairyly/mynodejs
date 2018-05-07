# express+mongodb 搭建多人博客
（我的Windows）

## 目录

- [搭建基本node环境](#搭建基本node环境)
- [2.创建 express 项目](#2.创建 express 项目)

- [独行](#独行)
- [传记](#传记)
- [历史](#历史)
- [科学](#科学)
- [技术](#技术)
- [杂类](#杂类)


### 1.搭建基本 node 环境
- 安装 [node](https://nodejs.org/zh-cn/) ，可下载后安装；
  ```sh
    安装完成后，输入命令，查看 node 版本
    C:\Users\fairy>node -v
    v8.9.3
  ```
  
- 安装 [mongodb](https://www.mongodb.com/download-center#enterprise),还是下载后安装，只支持Windows 64位系统；  
  - [我的mongodb安装部分](https://github.com/fairyly/mynodejs/blob/gh-pages/mongodb%20%E9%83%A8%E5%88%86.md)  
  - 安装后，可以安装 mongodb 可视化管理工具:   
    RoboMongo: https://robomongo.org/  （用过，推荐）  
    NoSQL Manager for MongoDB: https://www.mongodbmanager.com/  （用过，推荐）  
    MongoChef: https://studio3t.com/    
  - 查看 mongodb 版本: 找到安装目录
  ```
      I:\momgodb\bin>mongo -version
      MongoDB shell version v3.6.2
      git version: 489d177dbd0f0420a8ca04d39fd78d0a2c539420
      OpenSSL version: OpenSSL 1.0.1u-fips  22 Sep 2016
      allocator: tcmalloc
      modules: enterprise
      build environment:
          distmod: windows-64
          distarch: x86_64
          target_arch: x86_64
  ```
- 安装 [express](),  
  - [我的 express 部分](https://github.com/fairyly/mynodejs/blob/gh-pages/express%20%E6%A8%A1%E5%9D%97.md)  
  - 全局安装：`npm install express -g`;  
  - 也可以通过应用生成器工具 express 可以快速创建一个应用的骨架：
  ```sh
    npm install express-generator -g
    express myapp
    这样就创建了一个名为 myapp 的应用
    
    然后安装所有依赖包：
    cd myapp 
    npm install
    
    启动这个应用：
    npm start
    然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了
  ```
- 查看 express 版本
  ```sh
    安装后，查看 express 版本
    C:\Users\fairy>express --version
    4.15.5
  ```

- 目前 node 环境搭建完成
```
  Node.js: 8.9.1
  MongoDB: 3.6.2
  Express: 4.15.5
```

### 2.创建 express 项目
使用 express 创建 myblog 项目：初始化项目
- 创建 myblog 项目目录
- cd myblog
- npm init
- 在 myblog 目录下创建以下目录及空文件  
  对应文件及文件夹的用处：
  - models: 存放操作数据库的文件
  - public: 存放静态文件，如样式、图片等
  - routes: 存放路由文件
  - views: 存放模板文件
  - index.js: 程序主文件
  - package.json: 存储项目名、描述、作者、依赖等等信息
>遵循 MVC（模型(model)－视图(view)－控制器(controller/route)） 的开发模式

>每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。
使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：
npm i -g supervisor 
运行 supervisor index 启动程序
