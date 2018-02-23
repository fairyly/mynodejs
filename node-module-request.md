# request

Simplified HTTP request client.

* github: https://github.com/request/request

* Super simple to use
```
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
```

* Table of contents
  - Streaming
  - Promises & Async/Await
  - Forms
  - HTTP Authentication
  - Custom HTTP Headers
  - OAuth Signing
  - Proxies
  - Unix Domain Sockets
  - TLS/SSL Protocol
  - Support for HAR 1.2
  - All Available Options
