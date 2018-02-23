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

1.Streaming
```
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))

fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'))

request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))

request
  .get('http://google.com/img.png')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(request.put('http://mysite.com/img.png'))
```
