# node-module-inquirer 

交互式命令行用户接口的集合

-GitHub：https://github.com/SBoudrias/Inquirer.js#readme

- use

```
npm install inquirer
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });
```

## 和 process.stdin 有些像
```
process.stdin.on('data', function(chunk) {
    process.stdout.write('data: ' + chunk);
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});
```

## 参考
- https://github.com/SBoudrias/Inquirer.js#readme
