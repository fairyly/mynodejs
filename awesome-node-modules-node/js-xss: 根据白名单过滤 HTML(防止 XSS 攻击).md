# js-xss

根据白名单过滤 HTML(防止 XSS 攻击)

## 安装
```
npm install xss
```

## 在 Node.js 中使用
```
var xss = require("xss");
var html = xss('<script>alert("xss");</script>');
console.log(html);
```



## 参考
- https://github.com/leizongmin/js-xss/blob/master/README.zh.md
