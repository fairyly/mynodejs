# async

* github: https://github.com/caolan/async
* web : http://caolan.github.io/async/


### use
```
npm install --save async

ES Modules
We also provide Async as a collection of ES2015 modules, in an alternative async-es package on npm.

$ npm install --save async-es
```


### Quick Examples
```
async.map(['file1','file2','file3'], fs.stat, function(err, results) {
    // results is now an array of stats for each file
});

async.filter(['file1','file2','file3'], function(filePath, callback) {
  fs.access(filePath, function(err) {
    callback(null, !err)
  });
}, function(err, results) {
    // results now equals an array of the existing files
});

async.parallel([
    function(callback) { ... },
    function(callback) { ... }
], function(err, results) {
    // optional callback
});

async.series([
    function(callback) { ... },
    function(callback) { ... }
]);
```
