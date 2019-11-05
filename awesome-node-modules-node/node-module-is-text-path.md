# is-text-path

检查是filepath是一个文本文件

## Install
```
$ npm install --save is-text-path
```
## Usage
```
var isTextPath = require('is-text-path');

isTextPath('src/unicorn.txt');
//=> true

isTextPath('src/unicorn.png');
//=> false
```

## 参考
- https://github.com/sindresorhus/is-text-path
