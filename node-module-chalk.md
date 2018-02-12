# node-module-chalk

chalk: 粉笔

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

const chalk = require('chalk');
const log = console.log;

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
	'I am a green line ' +
	chalk.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
));

// ES2015 template literal
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

// ES2015 tagged template literal
log(chalk`
CPU: {red ${cpu.totalPercent}%}
RAM: {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);

// Use RGB colors in terminal emulators that support it.
log(chalk.keyword('orange')('Yay for orange colored text!'));
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));
Easily define your own themes:

const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

console.log(error('Error!'));
console.log(warning('Warning!'));
Take advantage of console.log string substitution:

const name = 'Sindre';
console.log(chalk.green('Hello %s'), name);
//=> 'Hello Sindre'
```


### API

* 1.chalk.<style>[.<style>...](string, [string...])
```
    Example: chalk.red.bold.underline('Hello', 'world');
```
    
* 2.chalk.enabled
```
If you need to change this in a reusable module, create a new instance:

const ctx = new chalk.constructor({enabled: false});
```

* 3.chalk.level
```
If you need to change this in a reusable module, create a new instance:

const ctx = new chalk.constructor({level: 0});

Levels are as follows:

All colors disabled
Basic color support (16 colors)
256 color support
Truecolor support (16 million colors)
```

* 4.chalk.supportsColor
```

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
