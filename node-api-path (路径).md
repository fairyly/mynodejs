# path (路径)
```
在 POSIX 上:

path.basename('C:\\temp\\myfile.html');
// 返回: 'C:\\temp\\myfile.html'
在 Windows 上:

path.basename('C:\\temp\\myfile.html');
// 返回: 'myfile.html'
```

要想在任何操作系统上处理 Windows 文件路径时获得一致的结果，可以使用 path.win32：
```
在 POSIX 和 Windows 上:

path.win32.basename('C:\\temp\\myfile.html');
// 返回: 'myfile.html'
```
要想在任何操作系统上处理 POSIX 文件路径时获得一致的结果，可以使用 path.posix：
```
在 POSIX 和 Windows 上:

path.posix.basename('/tmp/myfile.html');
// 返回: 'myfile.html'
```
注意：在 Windows 上 Node.js 遵循单驱动器工作目录的理念。 当使用驱动器路径且不带反斜杠时就能体验到该特征。  
例如，fs.readdirSync('c:\\') 可能返回与 fs.readdirSync('c:') 不同的结果

### 1.path.dirname(path)

path.dirname() 方法返回一个 path 的目录名，类似于 Unix 中的 dirname 命令。 Trailing directory separators are ignored, see path.sep.

例子：
```
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
如果 path 不是一个字符串，则抛出 TypeError。
```
### 2.path.extname(path)

```
path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。

例子：

path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''
如果 path 不是一个字符串，则抛出 TypeError。
```

### 3.path.format(pathObject)

```
例如，在 POSIX 上：

// 如果提供了 `dir`、`root` 和 `base`，则返回 `${dir}${path.sep}${base}`。
// `root` 会被忽略。
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'

// 如果没有指定 `dir`，则 `root` 会被使用。
// 如果只提供了 `root` 或 `dir` 等于 `root`，则平台的分隔符不会被包含。
// `ext` 会被忽略。
path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored'
});
// 返回: '/file.txt'

// 如果没有指定 `base`，则 `name` + `ext` 会被使用。
path.format({
  root: '/',
  name: 'file',
  ext: '.txt'
});
// 返回: '/file.txt'
在 Windows 上：

path.format({
  dir: 'C:\\path\\dir',
  base: 'file.txt'
});
// 返回: 'C:\\path\\dir\\file.txt'
```

### 5.path.parse(path)

```
path.parse() 方法返回一个对象，对象的属性表示 path 的元素。 Trailing directory separators are ignored, see path.sep.

返回的对象有以下属性：

dir <string>
root <string>
base <string>
name <string>
ext <string>
例如，在 POSIX 上：

path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
(请无视以上字符串中的空格，它们只是为了布局)
在 Windows 上：

path.parse('C:\\path\\dir\\file.txt');
// 返回:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\      path\dir   \ file  .txt "
└──────┴──────────────┴──────┴─────┘
(请无视以上字符串中的空格，它们只是为了布局)
如果 path 不是一个字符串，则抛出 TypeError。
```
