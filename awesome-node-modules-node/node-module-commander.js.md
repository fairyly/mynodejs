# node-module-commander.js

node 命令行接口

## use

```
 npm install commander --save
```
- 新建 index.js
```
 #!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```

- 终端输入 `node index.js -help`, 就会出现
```
Usage: index [options]

  Options:

    -V, --version        output the version number
    -p, --peppers        Add peppers
    -P, --pineapple      Add pineapple
    -b, --bbq-sauce      Add bbq sauce
    -c, --cheese [type]  Add the specified type of cheese [marble] (default: marble)
    -h, --help           output usage information
```

- 终端输入 `node index.js --version` ,就会输出版本号
```
0.1.0
```


## 参考
- https://github.com/tj/commander.js#readme
