# Content Security Policy



CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。

CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。


两种方法可以启用 CSP。

- 一种是通过 HTTP 头信息的Content-Security-Policy的字段。
```

Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```
- 另一种是通过网页的<meta>标签。

```
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```


上面代码中，CSP 做了如下配置。

- 脚本：只信任当前域名
  - <object>标签：不信任任何URL，即不加载任何资源
  - 样式表：只信任cdn.example.org和third-party.org
  - 框架（frame）：必须使用HTTPS协议加载
  - 其他资源：没有限制
  - 启用后，不符合 CSP 的外部资源就会被阻止加载。


## 参考
- http://www.ruanyifeng.com/blog/2016/09/csp.html
- https://www.html5rocks.com/en/tutorials/security/content-security-policy/
