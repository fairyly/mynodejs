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

## path.join
`path.join()` 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

```
path.join([...paths]);
...paths string类型
path.join(__dirname, './02art-template.js');
// 'C:\Users\liangliang17\Desktop\Node_study\Node\5.path\02.art-template.js'

path.join('/foo', 'bar', './baz');
// '/foo/bar/baz'

path.join('/foo', 'bar', '/baz', '..');
// '/foo/bar'
```
## path.resolve

`path.resolve()` 把一个路径或路径片段的序列解析为一个绝对路径。
```
path.resolve([...paths])
...paths string类型
```

- 给定的路径的序列是 "从右往左" 被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
```
path.resolve('foo', '/baz', 'bar');
// 'C:\baz\bar'
```
- 如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录（绝对路径）会被用上。
```
path.resolve('bar', 'baz', 'foo');
// 'C:\Users\liangliang17\Desktop\Node_study\Node\5.path\bar\baz\foo'
```
- 生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录。
```
path.resolve('/foo', 'bar/', 'baz/');
// 'C:\foo\bar\baz' 
// 注意：foo前面的 '/' 代表根目录，即'C:'; 并且baz末尾的斜线会删除

path.resolve('/');
// 'C:\' 如果路径为根路径，末尾的斜线不会删除
```
- 长度为零的path片段会被忽略

```
path.resolve('foo', '/baz', '', 'bar');
// 'C:\baz\bar'
```

- 如果没有传入path片段，则resolve会返回当前工作目录的绝对路径

```
path.resolve();
// 'C:\Users\liangliang17\Desktop\Node_study\Node\5.path'
```
