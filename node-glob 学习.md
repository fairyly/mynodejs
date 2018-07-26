# node-glob 学习

node的glob模块允许你使用*等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则的文件。

glob工具是基于JavaScript的，它使用了minimatch库来进行匹配。

```

var glob = require("glob")
 
// options 是可选的
glob("**/*.js", options, function (er, files) {
  // files 是匹配到的文件的数组.
  // 如果 `nonull` 选项被设置为true, 而且没有找到任何文件,那么files就是glob规则本身,而不是空数组
  // er是当寻找的过程中遇的错误
})
```


## 参考资料
- https://www.cnblogs.com/liulangmao/p/4552339.html
- GitHub：https://github.com/isaacs/node-glob
