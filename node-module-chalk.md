# node-module-chalk

node 中设置终端字符样式的模块

* GitHub： https://github.com/chalk/chalk


### Install
```
$ npm install chalk
```
### Usage
```
const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));
```


### API

* 1.chalk.<style>[.<style>...](string, [string...])
```
    Example: chalk.red.bold.underline('Hello', 'world');
```
