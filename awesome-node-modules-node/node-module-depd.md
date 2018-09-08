# depd

* github: https://github.com/dougwilson/nodejs-depd


* install

This module is installed directly using npm:

```
$ npm install depd
```

* Examples

```
var deprecate = require('depd')('my-cool-module')

// message automatically derived from function name
// Object.oldfunction
exports.oldfunction = deprecate.function(function oldfunction () {
  // all calls to function are deprecated
})

// specific message
exports.oldfunction = deprecate.function(function () {
  // all calls to function are deprecated
}, 'oldfunction')
```
