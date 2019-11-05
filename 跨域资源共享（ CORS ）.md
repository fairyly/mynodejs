# 跨域资源共享（ CORS ）
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

- Access-Control-Allow-Origin
```
Access-Control-Allow-Origin: <origin> | *

例如，下面的字段值将允许来自 http://mozilla.com 的请求：
Access-Control-Allow-Origin: http://mozilla.com

```

- Access-Control-Expose-Headers
```
如果要访问其他头，则需要服务器设置本响应头。

Access-Control-Expose-Headers 头让服务器把允许浏览器访问的头放入白名单，例如：

Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
这样浏览器就能够通过getResponseHeader访问X-My-Custom-Header和 X-Another-Custom-Header 响应头了。
```

- Access-Control-Max-Age
```
Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

Access-Control-Max-Age: <delta-seconds>
delta-seconds 参数表示preflight请求的结果在多少秒内有效。
```

- Access-Control-Allow-Credentials
```
Access-Control-Allow-Credentials 头指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。
当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；
如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

Access-Control-Allow-Credentials: true
```

- Access-Control-Allow-Methods

```
Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

Access-Control-Allow-Methods: <method>[, <method>]*
```

- Access-Control-Allow-Headers
```
Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

Access-Control-Allow-Headers: <field-name>[, <field-name>]*
```
