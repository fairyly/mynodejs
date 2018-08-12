
# ora

优雅的终端微调器

## use

```
$ npm install ora


const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```


## 参考
- https://github.com/sindresorhus/ora
