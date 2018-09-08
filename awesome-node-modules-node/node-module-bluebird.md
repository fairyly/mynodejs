# bluebird

* github: https://github.com/petkaantonov/bluebird
* http://bluebirdjs.com


* use Node.js
```
npm install bluebird

Then:
var Promise = require("bluebird");
```

* demo

```
// The most popular redis module
var Promise = require("bluebird");
Promise.promisifyAll(require("redis"));
// The most popular mongodb module
var Promise = require("bluebird");
Promise.promisifyAll(require("mongodb"));
// The most popular mysql module
var Promise = require("bluebird");
// Note that the library's classes are not properties of the main export
// so we require and promisifyAll them manually
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
// Mongoose
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
// Request
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));
// Use request.getAsync(...) not request(..), it will not return a promise
// mkdir
var Promise = require("bluebird");
Promise.promisifyAll(require("mkdirp"));
// Use mkdirp.mkdirpAsync not mkdirp(..), it will not return a promise
// winston
var Promise = require("bluebird");
Promise.promisifyAll(require("winston"));
// rimraf
var Promise = require("bluebird");
// The module isn't promisified but the function returned is
var rimrafAsync = Promise.promisify(require("rimraf"));
// xml2js
var Promise = require("bluebird");
Promise.promisifyAll(require("xml2js"));
// jsdom
var Promise = require("bluebird");
Promise.promisifyAll(require("jsdom"));
// fs-extra
var Promise = require("bluebird");
Promise.promisifyAll(require("fs-extra"));
// prompt
var Promise = require("bluebird");
Promise.promisifyAll(require("prompt"));
// Nodemailer
var Promise = require("bluebird");
Promise.promisifyAll(require("nodemailer"));
// ncp
var Promise = require("bluebird");
Promise.promisifyAll(require("ncp"));
// pg
var Promise = require("bluebird");
Promise.promisifyAll(require("pg"));
```
