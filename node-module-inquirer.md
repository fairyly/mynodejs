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

- list
```
inquirer
    .prompt([{
            type: 'list',
            name: 'theme',
            message: 'What do you want to do?',
            choices: [
                'Order a pizza',
                'Make a reservation',
                new inquirer.Separator(),
                'Ask for opening hours',
                {
                    name: 'Contact support',
                    disabled: 'Unavailable at this time'
                },
                'Talk to the receptionist'
            ]
        },
        {
            type: 'list',
            name: 'size',
            message: 'What size do you need?',
            choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
            filter: function(val) {
                return val.toLowerCase();
            }
        }
    ])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
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
