# events (事件)


```
一个绑定了一个监听器的 EventEmitter 实例。 eventEmitter.on() 方法用于注册监听器，eventEmitter.emit() 方法用于触发事件。

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发了一个事件！');
});
myEmitter.emit('event');
```
