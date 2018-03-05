# winston  生成日志

* winston:  https://github.com/winstonjs/winston
* express-winston: https://github.com/bithavoc/express-winston

demo:

```
const winston = require('winston')
const expressWinston = require('express-winston')
将：

// 路由
routes(app)
修改为：

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))
// 路由
routes(app)
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))
```
