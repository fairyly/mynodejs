# autocannon

fast HTTP/1.1 benchmarking tool written in Node.js

* guthub:  https://github.com/mcollina/autocannon

* Install
```
npm i autocannon -g
```

* Usage
```
Command Line
Usage: autocannon [opts] URL

URL is any valid http or https url.

Available options:

  -c/--connections NUM
        The number of concurrent connections to use. default: 10.
  -p/--pipelining NUM
        The number of pipelined requests to use. default: 1.
  -d/--duration SEC
        The number of seconds to run the autocannnon. default: 10.
  -a/--amount NUM
        The amount of requests to make before exiting the benchmark. If set, duration is ignored.
  -S/--socketPath
        A path to a Unix Domain Socket or a Windows Named Pipe. A URL is still required in order to send the correct Host header and path.
  -m/--method METHOD
        The http method to use. default: 'GET'.
  -t/--timeout NUM
        The number of seconds before timing out and resetting a connection. default: 10
  -T/--title TITLE
        The title to place in the results for identification.
  -b/--body BODY
        The body of the request.
  -i/--input FILE
        The body of the request.
  -H/--headers K=V
        The request headers.
  -B/--bailout NUM
        The number of failures before initiating a bailout.
  -M/--maxConnectionRequests NUM
        The max number of requests to make per connection to the server.
  -O/--maxOverallRequests NUM
        The max number of requests to make overall to the server.
  -r/--connectionRate NUM
        The max number of requests to make per second from an individual connection.
  -R/--overallRate NUM
        The max number of requests to make per second from an all connections.
        connection rate will take precedence if both are set.
        NOTE: if using rate limiting and a very large rate is entered which cannot be met,
              Autocannon will do as many requests as possible per second.
  -D/--reconnectRate NUM
        Some number of requests to make before resetting a connections connection to the
        server.
  -n/--no-progress
        Don't render the progress bar. default: false.
  -l/--latency
        Print all the latency data. default: false.
  -I/--idReplacement
        Enable replacement of [<id>] with a randomly generated ID within the request body. default: false.
  -j/--json
        Print the output as newline delimited json. This will cause the progress bar and results not to be rendered. default: false.
  -f/--forever
        Run the benchmark forever. Efficiently restarts the benchmark on completion. default: false.
  -v/--version
        Print the version number.
  -h/--help
        Print this menu.
```

* Programmatically
```
'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)
```

* Example using the autocannon events and the client API and events:
```
'use strict'

const autocannon = require('autocannon')

const instance = autocannon({
  url: 'http://localhost:3000',
  setupClient: setupClient
}, (err, result) => handleResults(result))
// results passed to the callback are the same as those emitted from the done events
instance.on('done', handleResults)

instance.on('tick', () => console.log('ticking'))

instance.on('response', handleResponse)

function setupClient (client) {
  client.on('body', console.log) // console.log a response body when its received
}

function handleResponse (client, statusCode, resBytes, responseTime) {
  console.log(`Got response with code ${statusCode} in ${responseTime} milliseconds`)
  console.log(`response: ${resBytes.toString()}`)

  //update the body or headers
  client.setHeaders({new: 'header'})
  client.setBody('new body')
  client.setHeadersAndBody({new: 'header'}, 'new body')
}

function handleResults(result) {
  // ...
}
```

# node-ab

A command tool to test the performance of HTTP services.

* github: https://github.com/doubaokun/node-ab

* Installation:
```
sudo npm install node-ab -g 
```

* Usage:
```
nab [URL] [--increase 100] [--milliseconds 1] [--help] [--verbose]


nab --help
Usage: nab <URL> [--increase 100] [--milliseconds 1] [--help] [--verbose]

Samples:
    nab http://192.168.1.66
    nab http://localhost
    nab http://localhost:4000 --increase 200
    nab http://localhost:4000 -i 200
    nab http://localhost:4000 --milliseconds 1500
    nab http://localhost:4000 --milliseconds 1500 --verbose
    nab http://localhost:4000 -m 1500
    nab http://localhost:4000 -m 1500 -v
    nab --help
    nab -h
```    

* Example:
```
nab http://localhost:4000/test
Request number: 200 Return number: 200 QPS: 66 Traffic: 32KB per second
Request number: 800 Return number: 800 QPS: 133 Traffic: 65KB per second
Request number: 1700 Return number: 1700 QPS: 188 Traffic: 92KB per second
Request number: 2900 Return number: 2900 QPS: 241 Traffic: 117KB per second
Request number: 4400 Return number: 4400 QPS: 293 Traffic: 143KB per second
Request number: 6200 Return number: 6200 QPS: 344 Traffic: 168KB per second
Request number: 8300 Return number: 8300 QPS: 394 Traffic: 192KB per second
Request number: 10700 Return number: 10700 QPS: 445 Traffic: 217KB per second
Request number: 13400 Return number: 13400 QPS: 495 Traffic: 242KB per second
Request number: 16400 Return number: 16366 QPS: 545 Traffic: 266KB per second
Request number: 16400 Return number: 16366 QPS: 495 Traffic: 241KB per second
Request number: 16400 Return number: 16366 QPS: 454 Traffic: 221KB per second
Request number: 16400 Return number: 16366 QPS: 419 Traffic: 204KB per second
Request number: 16400 Return number: 16366 QPS: 389 Traffic: 190KB per second
Request number: 18400 Return number: 18268 QPS: 405 Traffic: 198KB per second
Request number: 21400 Return number: 21009 QPS: 437 Traffic: 213KB per second
```

* Development
```
git clone git@github.com:doubaokun/node-ab.git
npm install -d
```
