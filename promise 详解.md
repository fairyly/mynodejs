# promise


* 1
```
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
运行结果：

1
2
4
3
```

Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的


* 2

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

运行结果：

promise1 Promise { <pending> }
promise2 Promise { <pending> }
(node:50928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: error!!!
(node:50928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
promise1 Promise { 'success' }
promise2 Promise {
  <rejected> Error: error!!!
    at promise.then (...)
    at <anonymous> }
```

promise 有 3 种状态：pending、fulfilled 或 rejected。
状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。
上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。


* 4 链式调用

```
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })
  
  promise 可以链式调用。提起链式调用我们通常会想到通过 return this 实现，不过 Promise 并不是这样实现的。
  promise 在每次调用 .then 或者 .catch 时都会返回一个新的 promise，从而可以实现链式调用。
```

* 5
```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})

promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。
或者说，promise 内部状态一经改变，并且有了一个值，则后续在每次调用 .then 或者 .catch 时都会直接拿到该值。
```

* 6
```
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
  
  
  .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成如下其中一种：

return Promise.reject(new Error('error!!!'))
throw new Error('error!!!')

因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。
```

* 7
```
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
```

  - .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。类似于：
```
process.nextTick(function tick () {
  console.log('tick')
  process.nextTick(tick)
})
```

* 8
```
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

运行结果：

1

解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
```

* 10

```
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
运行结果：

end
nextTick
then
setImmediate

解释：process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。
事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。
```


## 值穿透
- https://github.com/nswbmw/node-in-debugging/blob/master/3.1%20Promise.md#317-%E5%80%BC%E7%A9%BF%E9%80%8F
```
值穿透即传入 then/catch 的参数如果不为函数，则忽略该值，返回上一个 promise 的结果。看一段代码：

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
promise
  .then('hehe')
  .then(console.log)
最终打印 haha 而不是 hehe。
```

### Promise.all

```
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var request = {
        comment: function getComment() {
            return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
        },
        people: function getPeople() {
            return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
        }
    };
function main() {
    return Promise.all([request.comment(), request.people()]);
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.log(error);
});

Promise.all 接收 promise对象组成的数组作为参数

Promise.all([request.comment(), request.people()]);
在上面的代码中，request.comment() 和 request.people() 会同时开始执行，而且每个promise的结果（resolve或reject时传递的参数值），和传递给 Promise.all 的promise数组的顺序是一致的。

也就是说，这时候 .then 得到的promise数组的执行结果的顺序是固定的
```

### Promise.race

Promise.all 在接收到的所有的对象promise都变为 FulFilled 或者 Rejected 状态之后才会继续进行后面的处理， 

与之相对的是 Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

## 微任务

then方法绑定两个回调函数：成功时的回调函数console.log，失败时的回调函数console.error（可以省略）

```
new Promise(function (resolve, reject) {
  resolve(1);
}).then(console.log);
```


## demo
```
var preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};


preloadImage('https://b-gold-cdn.xitu.io/v3/static/img/conf.0367134.png')
  .then(function (e) { document.body.append(e.target) })
  .then(function () { console.log('加载成功') })
```

## 
>Promise 的优点在于，让回调函数变成了规范的链式写法，程序流程可以看得很清楚。它有一整套接口，可以实现许多强大的功能，比如同时执行多个异步操作，等到它们的状态都改变以后，再执行一个回调函数；再比如，为多个回调函数中抛出的错误，统一指定处理方法等等。

>而且，Promise 还有一个传统写法没有的好处：它的状态一旦改变，无论何时查询，都能得到这个状态。这意味着，无论何时为 Promise 实例添加回调函数，该函数都能正确执行。所以，你不用担心是否错过了某个事件或信号。如果是传统写法，通过监听事件来执行回调函数，一旦错过了事件，再添加回调函数是不会执行的。
>Promise 的缺点是，编写的难度比传统写法高，而且阅读代码也不是一眼可以看懂。你只会看到一堆then，必须自己在then的回调函数里面理清逻辑。

## 参考资料
- http://es6.ruanyifeng.com/#docs/promise
- http://javascript.ruanyifeng.com/advanced/promise.html
- https://github.com/nswbmw/node-in-debugging/blob/master/3.1%20Promise.md
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
