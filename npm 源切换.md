# npm 源切换

## 常用 npm 源
- 公司源: npm config set registry 公司源地址

- 淘宝源: npm config set registry https://registry.npm.taobao.org/

- npm官方源: npm config set registry https://registry.npmjs.org/

## 切换源
```

npm config set registry 源地址
nrm
  npm install nrm -g  //安装 
  nrm add local 公司源地址
  nrm use local
  nrm ls //查看
  
```
