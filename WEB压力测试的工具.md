# WEB压力测试的工具

在 cnode 社区看到问题

* https://segmentfault.com/q/1010000000409713

有人推荐:https://github.com/wg/wrk

* loadtest: https://github.com/alexfernandez/loadtest 负载测试
  - Runs a load test on the selected URL. Easy to extend minimally for your own ends.
  ```
  Basic Usage
  Run as a script to load test a URL:

  $ loadtest [-n requests] [-c concurrency] [-k] URL
  
  The URL can be "http://", "https://" or "ws://". Set the max number of requests with -n, and the desired level of concurrency with the -c parameter. Use keep-alive connections with -k whenever it makes sense, which should be always except when you are testing opening and closing connections.

  Single-dash parameters (e.g. -n) are designed to be compatible with Apache ab, except that here you can add the parameters after the URL.

  To get online help, run loadtest without parameters:

  $ loadtest
  
  
  Usage Dos
  
  loadtest -c 10 --rps 200 http://mysite.com/
  ```
