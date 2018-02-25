# autocannon

fast HTTP/1.1 benchmarking tool written in Node.js

* guthub:  https://github.com/mcollina/autocannon

* Install
```
npm i autocannon -g
```

* Programmatically
```
'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)
```

# node-ab

A command tool to test the performance of HTTP services.

* github: https://github.com/doubaokun/node-ab
