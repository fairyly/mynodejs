# vinyl-fs  

Vinyl adapter for the file system.  
Vinyl is a very simple metadata object that describes a file. 

* github: https://github.com/gulpjs/vinyl-fs


* Usage
```
var map = require('map-stream');
var vfs = require('vinyl-fs');

var log = function(file, cb) {
  console.log(file.path);
  cb(null, file);
};

vfs.src(['./js/**/*.js', '!./js/vendor/*.js'])
  .pipe(map(log))
  .pipe(vfs.dest('./output'));
```
