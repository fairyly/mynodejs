# npm 换源

## 使用 npm config set

```
npm config set registry https://registry.npm.taobao.org

npm config set registry http://www.npmjs.org

查看特定package的详细信息，输出的信息非常详尽，包括作者、版本、依赖等
npm info vue

dist:
   { shasum: '07edb75e8412aaeed871ebafa99f4672584a0085',
     size: 680927,
     noattachment: false,
     tarball: 'http://registry.npm.taobao.org/vue/download/vue-2.5.16.tgz' },
  directories: {},
  publish_time: 1520979268959 }
  
  
查看所有配置
npm config list

直接修改配置文件
npm config edit

设置proxy
npm config set proxy http://proxy.example.com:8080

查看proxy
npm config get proxy

删除proxy
npm delete proxy



package更新
npm update 包名
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
