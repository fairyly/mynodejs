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

