# demo


* app.js
```
var server = require('./server');
var router = require('./router');
var handler = require('./handler');

var handle = {};
handle["/"] = handler.home;
handle['/home'] = handler.home;
handle['/review'] = handler.review;
handle['/api/v1/records'] = handler.api_records;

server.startServer(router.route, handle);
```
* server.js

```
var http = require('http');
var fs = require('fs');

function startServer(route, handle) {
    var onRequest = function(request, response) {
        console.log('Request received ' + request.url);
        route(handle, request.url, response);
    }

    var server = http.createServer(onRequest);

    server.listen(3000, '127.0.0.1');
    console.log('Server started on localhost port 3000');
}

module.exports.startServer = startServer;
```

* router.js
```
var fs = require('fs');

function route(handle, pathname, response) {
    console.log('Routing a request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response);
    }
}

module.exports.route = route;
```


* handler.js

```
var fs = require('fs');

function home(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(response);
}

function review(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/review.html', 'utf8').pipe(response);
}

function api_records(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    var jsonObj = {
        name: "hfpp2012"
    };
    response.end(JSON.stringify(jsonObj));
}

module.exports = {
    home: home,
    review: review,
    api_records: api_records
}
```
