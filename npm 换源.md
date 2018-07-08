# npm 换源

## 使用 npm config set

```
npm config set registry https://registry.npm.taobao.org

npm config set registry http://www.npmjs.org
```


## 使用 nrm 切换

```
npm i -g nrm

npm ls // 查看 npm 源列表

出现下面列表：
  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  
npm use 源名  
如： npm use taobao // 使用 淘宝源
```
