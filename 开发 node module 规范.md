# 开发 node module 规范

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


## 参考资料

- https://github.com/xudafeng/ipv4
