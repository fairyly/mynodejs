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

### Styles

* Modifiers  
  - reset
  - bold
  - dim
  - italic (Not widely supported)
  - underline
  - inverse
  - hidden
  - strikethrough (Not widely supported)
  - visible (Text is emitted only if enabled)

* Colors
  - black
  - red
  - green
  - yellow
  - blue (On Windows the bright version is used since normal blue is illegible)
  - magenta
  - cyan
  - white
  - gray ("bright black")
  - redBright
  - greenBright
  - yellowBright
  - blueBright
  - magentaBright
  - cyanBright
  - whiteBright

* Background colors
  - bgBlack
  - bgRed
  - bgGreen
  - bgYellow
  - bgBlue
  - bgMagenta
  - bgCyan
  - bgWhite
  - bgBlackBright
  - bgRedBright
  - bgGreenBright
  - bgYellowBright
  - bgBlueBright
  - bgMagentaBright
  - bgCyanBright
  - bgWhiteBright
