# mongolass-

Elegant MongoDB driver for Node.js.


```
lib/mongo.js

const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)
```
