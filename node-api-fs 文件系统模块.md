# fs 模块

* Node.js的__dirname，__filename，process.cwd()，./的一些坑 :https://github.com/jawil/blog/issues/18

```
说一下这几个路径的意思：

__dirname：    获得当前执行文件所在目录的完整目录名
__filename：   获得当前执行文件的带有完整绝对路径的文件名
process.cwd()：获得当前执行node命令时候的文件夹目录名 
./：           文件所在目录

写这些代码，看看输出是什么：

const path = require('path')
console.log('__dirname：', __dirname)
console.log('__filename：', __filename)
console.log('process.cwd()：', process.cwd())
console.log('./：', path.resolve('./'))
```

### 1.删除文件操作 fs.unlink 不加 sync 的都是异步操作，加 sync 的都是同步操作

```
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});

同步方法的例子：

const fs = require('fs');

fs.unlinkSync('/tmp/hello');
console.log('成功删除 /tmp/hello');
```
### 2.readFile()，readFileSync()

```
readFile方法用于异步读取数据。

fs.readFile('./image.png', function (err, buffer) {
  if (err) throw err;
  process(buffer);
});
```

### 3.writeFile()，writeFileSync()
```
writeFile方法用于异步写入文件。

fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
```

### 4.mkdir()，writeFile()，readFile()
mkdir方法用于新建目录。
```

var fs = require('fs');

fs.mkdir('./helloDir',0777, function (err) {
  if (err) throw err;
});

mkdir接受三个参数，第一个是目录名，第二个是权限值，第三个是回调函数。
上面代码中，writeFile方法的第一个参数是写入的文件名，第二个参数是写入的字符串，第三个参数是回调函数。

writeFile方法用于写入文件。


var fs = require('fs');

fs.writeFile('./helloDir/message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('文件写入成功');
});

readFile方法用于读取文件内容。

var fs = require('fs');

fs.readFile('./helloDir/message.txt','UTF-8' ,function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

### 5.readdir()，readdirSync()
readdir方法用于读取目录，返回一个所包含的文件和子目录的数组。
```
fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var count = files.length;
  var results = {};
  files.forEach(function (filename) {
    fs.readFile(filename, function (data) {
      results[filename] = data;
      count--;
      if (count <= 0) {
        // 对所有文件进行处理
      }
    });
  });
});
```

### 6.stat()
stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。  

我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。

如果要检查一个文件是否存在且不操作它，推荐使用 fs.access()。

不建议在调用 fs.open() 、fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查一个文件是否存在。   
作为替代，用户代码应该直接打开/读取/写入文件，当文件无效时再处理错误

### 7.fs.open(path, flags[, mode], callback) 异步地打开文件
```
// macOS 与 Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

// Windows 与 FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});

许多函数也是基于 fs.open() 拥有这样的效果。例: fs.writeFile(), fs.readFile(), 等
```
### 8.watchfile()，unwatchfile()

watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。
```
var fs = require('fs');

fs.watchFile('./testFile.txt', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./testFile.txt', "changed", function (err) {
  if (err) throw err;

  console.log("file write complete");   
});
unwatchfile方法用于解除对文件的监听
```

### 9.createReadStream()
createReadStream方法往往用于打开大型的文本文件，创建一个读取操作的数据流。  
所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个data事件，发送结束会触发end事件。
```
var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream('lines.txt');
readLines(input, func);
```
### 10.createWriteStream()
createWriteStream方法创建一个写入数据流对象，该对象的write方法用于写入数据，end方法用于结束写入操作。
```
var out = fs.createWriteStream(fileName, {
  encoding: 'utf8'
});
out.write(str);
out.end();
```
### createWriteStream方法和createReadStream方法配合，可以实现拷贝大型文件。
```
function fileCopy(filename1, filename2, done) {
  var input = fs.createReadStream(filename1);
  var output = fs.createWriteStream(filename2);

  input.on('data', function(d) { output.write(d); });
  input.on('error', function(err) { throw err; });
  input.on('end', function() {
    output.end();
    if (done) done();
  });
}
```
