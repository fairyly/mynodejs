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

### EventEmitter实例对象的emit方法，用来触发事件。它的第一个参数是事件名称，其余参数都会依次传入回调函数。
```
var EventEmitter = require('events').EventEmitter;
var myEmitter = new EventEmitter();

var connection = function (id) {
  console.log('client id: ' + id);
};

myEmitter.on('connection', connection);
myEmitter.emit('connection', 6);
// client id: 6
### once()
```

该方法类似于on方法，但是回调函数只触发一次。

```
var EventEmitter = require('events').EventEmitter;
var myEmitter = new EventEmitter;

myEmitter.once('message', function(msg){
  console.log('message: ' + msg);
});

myEmitter.emit('message', 'this is the first message');
myEmitter.emit('message', 'this is the second message');
myEmitter.emit('message', 'welcome to nodejs');
上面代码触发了三次message事件，但是回调函数只会在第一次调用时运行。
```
下面代码指定，一旦服务器连通，只调用一次的回调函数。
```
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
```
该方法返回一个EventEmitter对象，因此可以链式加载监听函数。

### removeListener()

该方法用于移除回调函数。它接受两个参数，第一个是事件名称，第二个是回调函数名称。这就是说，不能用于移除匿名函数。

```
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

emitter.on('message', console.log);

setInterval(function(){
  emitter.emit('message', 'foo bar');
}, 300);

setTimeout(function(){
  emitter.removeListener('message', console.log);
}, 1000);
```
