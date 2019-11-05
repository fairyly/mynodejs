# dns 模块

### 1) 第一类函数，使用底层操作系统工具进行域名解析，且无需进行网络通信。 这类函数只有一个：dns.lookup()。

```
const dns = require('dns');

dns.lookup('iana.org', (err, address, family) => {
  console.log('IP 地址: %j 地址族: IPv%s', address, family);
});
// IP 地址: "192.0.43.8" 地址族: IPv4
```

### 2):dns.resolve(hostname[, rrtype], callback)

使用DNS协议来解析一个主机名(e.g. 'nodejs.org')为一个资源记录的数组。  
回调函数的参数为(err, records)。  
当成功时，records将是一个资源记录的数组。它的类型和结构取决于rrtype：  

### 3) dns.resolve4(hostname[, options], callback)
使用DNS协议解析IPv4地址主机名(A记录)

### 4）dns.resolve6(hostname[, options], callback)
使用DNS协议解析IPv6地址主机名(AAAA记录)。adresses参数是传递给callback函数的IPv6地址数组.
