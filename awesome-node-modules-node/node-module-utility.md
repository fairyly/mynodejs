# node-module-utility:实用程序的集合。

- GitHub：https://github.com/node-modules/utility


## use

```
npm install utility


const utils = require('utility');


```
- md5
```
utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
utils.md5(new Buffer('苏千')).should.equal('5f733c47c58a077d61257102b2d44481');
// md5 base64 format
utils.md5('苏千', 'base64'); // 'X3M8R8WKB31hJXECstREgQ=='

// Object md5 hash. Sorted by key, and JSON.stringify. See source code for detail
utils.md5({foo: 'bar', bar: 'foo'}).should.equal(utils.md5({bar: 'foo', foo: 'bar'}));
```

- sha1
```
utils.sha1('苏千').should.equal('0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
utils.sha1(new Buffer('苏千')).should.equal('0a4aff6bab634b9c2f99b71f25e976921fcde5a5');
// sha1 base64 format
utils.sha1('苏千', 'base64'); // 'Ckr/a6tjS5wvmbcfJel2kh/N5aU='

// Object sha1 hash. Sorted by key, and JSON.stringify. See source code for detail
utils.sha1({foo: 'bar', bar: 'foo'}).should.equal(utils.sha1({bar: 'foo', foo: 'bar'}));
```


- sha256
```
utils.sha256(new Buffer('苏千')).should.equal('75dd03e3fcdbba7d5bec07900bae740cc8e361d77e7df8949de421d3df5d3635');
```


- hmac
```
// hmac-sha1 with base64 output encoding
utils.hmac('sha1', 'I am a key', 'hello world'); // 'pO6J0LKDxRRkvSECSEdxwKx84L0='
```


- decode and encode

```
// base64 encode
utils.base64encode('你好￥'); // '5L2g5aW977+l'
utils.base64decode('5L2g5aW977+l') // '你好￥'

// urlsafe base64 encode
utils.base64encode('你好￥', true); // '5L2g5aW977-l'
utils.base64decode('5L2g5aW977-l', true); // '你好￥'

// html escape
utils.escape('<script/>"& &amp;'); // '&lt;script/&gt;&quot;&amp; &amp;'

// Safe encodeURIComponent and decodeURIComponent
utils.decodeURIComponent(utils.encodeURIComponent('你好, nodejs')).should.equal('你好, nodejs');
```

- 

## 参考
- https://github.com/node-modules/utility
