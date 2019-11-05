# YApi

YApi 是一个可本地部署的、打通前后端及QA的、可视化的接口管理平台 https://yapi.ymfe.org

### 环境要求
```
nodejs（7.6+)
mongodb（2.6+）
git
```
### 安装

使用提供的 yapi-cli 工具，部署 YApi 平台是非常容易的。执行 yapi server 启动可视化部署程序，
输入相应的配置和点击开始部署，就能完成整个网站的部署。部署完成之后，可按照提示信息，
执行 node/{网站路径/server/app.js} 启动服务器。在浏览器打开指定url, 

点击登录输入您刚才设置的管理员邮箱，默认密码为 ymfe.org 登录系统（默认密码可在个人中心修改）。
```
npm install -g yapi-cli --registry https://registry.npm.taobao.org
yapi server 

提示打开 浏览器 访问： localhost:9090
按照提示填写内容，开始部署

部署成功提示
初始化管理员账号成功,账号名："1503534781@qq.com"，密码："ymfe.org"
部署成功，请切换到部署目录，输入： "node vendors/server/app.js" 指令启动服务器, 然后在浏览器打开 http://127.0.0.1:3000 访问
```

### 升级

升级项目版本是非常容易的，并且不会影响已有的项目数据，只会同步 vendors 目录下的源码文件。
```
cd  {项目目录}
yapi ls //查看版本号列表
yapi update //更新到最新版本
yapi update -v {Version} //更新到指定版本
```
