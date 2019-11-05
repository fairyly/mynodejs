# 自动上传前端代码到阿里云OSS 

* https://cnodejs.org/topic/59ddb60b20a1a3647d72aae5

```
const fs = require('fs');
const co = require('co');
const path = require('path');
const oss = require('ali-oss');

//构建oss对象
const store = oss({
  accessKeyId: 'accessKeyId',
  accessKeySecret: 'accessKeySecret',
  bucket: 'bucket',
  region: 'oss-cn-shenzhen',
});

(() => {
  const root = path.resolve(__dirname, './dist');
  const files = [];
  //递归取出所有文件夹下所有文件的路径
  function readDirSync(p) {
    const pa = fs.readdirSync(p);
    pa.forEach((e) => {
      const cur_path = `${p}/${e}`;
      const info = fs.statSync(cur_path);
      if (info.isDirectory()) {
        readDirSync(cur_path);
      } else {
        files.push(cur_path);
      }
    });
  }
  readDirSync(root);

  co(function* () {
    //遍历文件
    for (let index = 0; index < files.length; index += 1) {
      const e = files[index];
      const result = yield store.put(e.replace(root, ''), e);
      //提交文件到oss，这里要注意，阿里云不需要创建新文件夹，只有有路径，没有文件夹会自动创建
      console.log(result);
    }
  });
})();


```
