# minimist: parse argument options

* github: https://github.com/substack/minimist

* install
```

npm install minimist
```

* example
```
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```
* methods
```
var parseArgs = require('minimist')
```

# commander.js

node.js command-line interfaces made easy

* github: https://github.com/tj/commander.js

* Installation
```
$ npm install commander --save

```
* Option parsing
```
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



