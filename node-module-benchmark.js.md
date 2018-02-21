# benchmark.js

* github: https://github.com/bestiejs/benchmark.js

* https://benchmarkjs.com/


* Usage :

In Node.js:
```
var Benchmark = require('benchmark');
Optionally, use the microtime module for Node.js by Wade Simmons:

$ npm i --save microtime
```

example

```
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
  !!'Hello World!'.match(/o/);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
```
