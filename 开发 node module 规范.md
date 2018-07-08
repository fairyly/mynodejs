# 开发 node module 规范

目前写了一个 显示 ipv6的 包，已经发布 [show-ipv6](https://www.npmjs.com/package/show-ipv6)
- github: 

## demo

```
ipv4
├── package.json
├── index.js 
├── .gitignore
├── .npmignore
├── README.md
├── bin
|   ├
│   └── ipv4
│       
├── lib
|   └── ipv4.js
└── test
    └── ipv4.test.js
```

- package.json
```
{
  "name": "ipv4",
  "version": "1.0.4",
  "description": "ipv4",
  "bin": {
    "ipv4": "./bin/ipv4"
  },
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/xudafeng/ipv4.git"
  },
  "keywords": [
    "ip",
    "ipv4"
  ],
  "devDependencies": {
    "istanbul": "^0.4.5",
    "mocha": "*",
    "validator": "^9.2.0"
  },
  "scripts": {
    "test": "istanbul cover `npm bin`/_mocha"
  },
  "license": "MIT",
  "dependencies": {
    "address": "^1.0.3",
    "chalk": "^1.1.3",
    "copy-paste": "^1.3.0"
  }
}

```

- index.js 
```
'use strict';

module.exports = require('./lib/ipv4');
```

- ipv4
```
#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var copy = require('copy-paste').copy;

var ipv4 = require('..');

copy(ipv4, function() {
  console.log('Your ip is: '+ chalk.cyan(ipv4) +' which was in your clipboard.');
});

```

- ipv4.js
```
'use strict';

module.exports = require('address').ip() || '0.0.0.0';

```

- ipv4.test.js
```
'use strict';

const ipv4 = require('..');
const assert = require('assert');
const validator = require('validator');

describe('test', () => {
  it('should be ok', () => {
    assert(validator.isIP(ipv4), true);
  });
});

```


## 发布到 npm 

编写好模块后 ，登录 npm 

npm publish 即可

查看当前npm用户： npm who am i




- 参考 ：https://github.com/fairyly/mynodejs/blob/gh-pages/%E6%9E%84%E5%BB%BA%E5%8F%91%E5%B8%83%E8%87%AA%E5%B7%B1%E7%9A%84npm%20package.md

## 参考资料

- https://github.com/xudafeng/ipv4
