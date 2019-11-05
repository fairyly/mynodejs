# url

```
const url = require('url');

```

- url.hash:获取及设置URL的分段(hash)部分。
- url.host:获取及设置URL的主机(host)部分
- url.hostname:获取及设置URL的主机名(hostname)部分。 url.host和url.hostname之间的区别是url.hostname不 包含端口
- url.href:获取及设置序列化的URL
- url.origin:获取只读序列化的URL origin部分
- url.password:获取及设置URL的密码(password)部分。
- url.pathname:获取及设置URL的路径(path)部分
- url.port:获取及设置URL的端口(port)部分
- url.protocol:获取及设置URL的协议(protocol)部分

- url.search:获取及设置URL的序列化查询(query)部分部分
- url.searchParams:获取表示URL查询参数的URLSearchParams对象
- url.username:获取及设置URL的用户名(username)部分。
- url.toString():在URL对象上调用toString()方法将返回序列化的URL
- url.toJSON():在URL对象上调用toJSON()方法将返回序列化的URL
-


### URLSearchParams

URLSearchParamsAPI接口提供对URLquery部分的读写权限。URLSearchParams类也能够与以下四个构造函数中的任意一个单独使用

```
const { URL, URLSearchParams } = require('url');

const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));
// 输出 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href);
// 输出 https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(myURL.href);
// 输出 https://example.org/?a=b
```
