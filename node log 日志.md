# log

* log4js: https://github.com/log4js-node/log4js-node


### log4js 使用

打印颜色库: https://github.com/Marak/colors.js

- Logger: 输出的日志内容
- Appender : 日志输出到哪里
- Layout: 如何输出日志

* 1.基本用法
```
  var log4js = require('log4js');
  var logger = log4js.getLogger();
  logger.level = 'debug';
  logger.debug("Some debug messages");
```

* 2.保存日志到文件
```
  const log4js = require('log4js');
  log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  });

  const logger = log4js.getLogger('cheese');
  logger.trace('Entering cheese testing');
  logger.debug('Got cheese.');
  logger.info('Cheese is Gouda.');
  logger.warn('Cheese is quite smelly.');
  logger.error('Cheese is too ripe!');
  logger.fatal('Cheese was breeding ground for listeria.');
```
