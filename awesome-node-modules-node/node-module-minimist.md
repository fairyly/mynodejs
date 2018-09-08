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


# yargs

yargs the modern, pirate-themed successor to optimist.

* github: https://github.com/yargs/yargs
* website: http://yargs.js.org/

* Installation
```
npm i yargs --save
```
* Simple Example
```
#!/usr/bin/env node
const argv = require('yargs').argv

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!')
} else {
  console.log('Retreat from the xupptumblers!')
}
$ ./plunder.js --ships=4 --distance=22
Plunder more riffiwobbles!

$ ./plunder.js --ships 12 --distance 98.7
Retreat from the xupptumblers!
```
* Complex Example
```
#!/usr/bin/env node
require('yargs') // eslint-disable-line
  .command('serve [port]', 'start the server', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv
  ```
