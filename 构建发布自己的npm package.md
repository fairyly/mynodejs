# 构建发布自己的npm package


1.使用 npm 的注意报错：
```
no_perms Private mode enable, only admin can publish this module
设置回原本的就可以了：
npm config set registry http://registry.npmjs.org 

发布后 再设置 npm config set registry https://registry.npm.taobao.org/
```

npm config list
