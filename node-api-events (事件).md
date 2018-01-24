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

### Event Emitter 的实例方法

Event Emitter 的实例方法如下。
```
emitter.on(name, f) 对事件name指定监听函数f
emitter.addListener(name, f) addListener是on方法的别名
emitter.once(name, f) 与on方法类似，但是监听函数f是一次性的，使用后自动移除
emitter.listeners(name) 返回一个数组，成员是事件name所有监听函数
emitter.removeListener(name, f) 移除事件name的监听函数f
emitter.removeAllListeners(name) 移除事件name的所有监听函数
```
