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

request
  .get('http://mysite.com/doodle.png')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('doodle.png'))
Now let’s get fancy.

http.createServer(function (req, resp) {
  if (req.url === '/doodle.png') {
    if (req.method === 'PUT') {
      req.pipe(request.put('http://mysite.com/doodle.png'))
    } else if (req.method === 'GET' || req.method === 'HEAD') {
      request.get('http://mysite.com/doodle.png').pipe(resp)
    }
  }
})
```

2.Promises & Async/Await

```
Several alternative interfaces are provided by the request team, including:

request-promise (uses Bluebird Promises)
request-promise-native (uses native Promises)
request-promise-any (uses any-promise Promises)
```

3.Forms

```
request supports application/x-www-form-urlencoded and multipart/form-data form uploads. For multipart/related refer to the multipart API.

application/x-www-form-urlencoded (URL-Encoded Forms)
URL-encoded forms are simple.

request.post('http://service.com/upload', {form:{key:'value'}})
// or
request.post('http://service.com/upload').form({key:'value'})
// or
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
multipart/form-data (Multipart Form Uploads)
For multipart/form-data we use the form-data library by @felixge. For the most cases, you can pass your upload form data via the formData option.

var formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  my_buffer: new Buffer([1, 2, 3]),
  // Pass data via Streams
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
  // Pass multiple values /w an Array
  attachments: [
    fs.createReadStream(__dirname + '/attachment1.jpg'),
    fs.createReadStream(__dirname + '/attachment2.jpg')
  ],
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  // See the `form-data` README for more information about options: https://github.com/form-data/form-data
  custom_file: {
    value:  fs.createReadStream('/dev/urandom'),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpeg'
    }
  }
};
request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});


For advanced cases, you can access the form-data object itself via r.form(). This can be modified until the request is fired on the next cycle of the event-loop. (Note that this calling form() will clear the currently set form data for that request.)

// NOTE: Advanced use-case, for normal use see 'formData' usage above
var r = request.post('http://service.com/upload', function optionalCallback(err, httpResponse, body) {...})
var form = r.form();
form.append('my_field', 'my_value');
form.append('my_buffer', new Buffer([1, 2, 3]));
form.append('custom_file', fs.createReadStream(__dirname + '/unicycle.jpg'), {filename: 'unicycle.jpg'});


multipart/related

request({
    method: 'PUT',
    preambleCRLF: true,
    postambleCRLF: true,
    uri: 'http://service.com/upload',
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
      },
      { body: 'I am an attachment' },
      { body: fs.createReadStream('image.png') }
    ],
    // alternatively pass an object containing additional options
    multipart: {
      chunked: false,
      data: [
        {
          'content-type': 'application/json',
          body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
        },
        { body: 'I am an attachment' }
      ]
    }
  },
  function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
  })
```
