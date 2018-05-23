# 构建发布自己的npm package

- npm init
- 创建 index.js,编辑逻辑代码
- npm login  
  ~username  
  输入密码  
  输入邮箱  
- npm publish


1.使用 npm 的注意报错：
```
no_perms Private mode enable, only admin can publish this module
设置回原本的就可以了：
npm config set registry https://registry.npmjs.org/

发布后 再设置 npm config set registry https://registry.npm.taobao.org/
```

npm config list

npm whoami

npm cache clean

npm : yueheqing@demogic.com yhqfairy  yhq1503534781  
      498745097@qq.com fairy  yhq1503534781
