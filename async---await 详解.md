# async详解

>async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

Thunk 函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式

## async 函数的实现

async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

```
async function fn(args){
  // ...
}

// 等同于

function fn(args){ 
  return spawn(function*() {
    // ...
  }); 
}
```

所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。

下面给出 spawn 函数的实现，基本就是前文自动执行器的翻版。

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e); 
      }
      if(next.done) {
        return resolve(next.value);
      } 
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });      
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}

```
- [es6](http://es6.ruanyifeng.com/#docs/async#async-%E5%87%BD%E6%95%B0%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)

## 简介
- async 函数是什么？一句话，它就是 Generator 函数的语法糖。

  generator 函数需要通过调用next()方法，才能往后执行到下一个yield，但是 async 函数却不需要，它能够自动向后执行
  
  await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用

  await 字面上使得 JavaScript 等待，直到 promise 处理完成，然后将结果继续下去。
  
  await不能工作在顶级作用域，需要将await代码包裹在一个async函数中

- demo
```
前文有一个 Generator 函数，依次读取两个文件。

const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
==================================
写成async函数，就是下面这样。

const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

async函数对 Generator 函数的改进
```


- 当一个 async 函数中有多个 await命令时，如果不想因为一个出错而导致其与的都无法执行，应将await放在try...catch语句中执行
```
async function testAwait () {
    try {
        await func1()
        await func2()
        await func3()
    } catch (error) {
        console.log(error)
    }
}
```

- 并发执行 await 命令: await 是顺序执行的,Promise.all() 是并行的

```
// 方法 1
let [res1, res2] = await Promise.all([func1(), func2()])

// 方法 2
let func1Promise = func1()
let func2Promise = func2()
let res1 = await func1Promise
let res2 = await func2Promise


```

- async方法： 一个class方法同样能够使用async，只需要将async放在它之前就可以

就像这样：
```
class Waiter {
   async wait () {
       return await Promise.resolve(1)
   }
}
new Waiter().wait().then(alert) // 1

=======================

# Class methods:
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jaffathecake').then(…);
```

- sleep(): 让线程休眠一段时间
```
// wait ms milliseconds
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function hello() {
  await wait(500);
  return 'world';
}
```

## 举例说明啊，你有三个请求需要发生，第三个请求是依赖于第二个请求的解构第二个请求依赖于第一个请求的结果。若用 ES5实现会有3层的回调，若用Promise 实现至少需要3个then。一个是代码横向发展，另一个是纵向发展。今天指给出 async-await 的实现哈~

```
//我们仍然使用 setTimeout 来模拟异步请求
function sleep(second, param) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(param);
        }, second);
    })
}

async function test() {
    let result1 = await sleep(2000, 'req01');
    let result2 = await sleep(1000, 'req02' + result1);
    let result3 = await sleep(500, 'req03' + result2);
    console.log(`
        ${result3}
        ${result2}
        ${result1}
    `);
}

test();
```

## egg 中控制器写法

```
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    // const dataList = {
    //   list: [
    //     { id: 1, title: 'this is news 1', url: '/news/1' },
    //     { id: 2, title: 'this is news 2', url: '/news/2' }
    //   ]
    // };
    // await this.ctx.render('news/list.tpl', dataList);
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
```

## for 循环中使用 async/await

>曾经 vue 中在 forEach 中使用 await 会报错，就换成 for of;
不能在常规函数里使用 await
如果我们试图在非 async 函数里使用 await，就会出现一个语法错误：

- foreach 是同步操作并发操作,可以支持,需要稍微改造下 forEach：
```
demo:
function test(a) {
  return new Promise(function(resolve,reject){
    if (a){
      resolve(true);
    } else {
      reject(false);
    }
  })
}

async function demo() {
 let data = [{id:1},{id:2}];
 let flag = true
 data.forEach(function(ele,index) {
   if(ele.id == 2) {
     flag = await test(false);  // 这样写相当于 await 不在 async 异步函数内
   }
 })
 
 console.log(flag)
 if(!flag) {
    console.log(666,"信息未填写完")
    return false;
 }
  // 继续下面
}

demo()
```

- demo

```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function test(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);
```
- 参考
  - [JavaScript forEach 不支持 async/await？](https://www.zhihu.com/question/53466898)
  - [当 async/await 遇上 forEach](https://objcer.com/2017/10/12/async-await-with-forEach/)
  - [ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/)

## 参考资料
- [ MDN-await ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)
- [es6-async](http://es6.ruanyifeng.com/#docs/async)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals/primers/async-functions)
- https://github.com/nswbmw/node-in-debugging/blob/master/3.2%20Async%20%2B%20Await.md
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
- https://www.jianshu.com/p/5fb1586b9164
- https://github.com/tc39/ecmascript-asyncawait
- [async-await](https://javascript.info/async-await)
- [async 函数的含义和用法](www.ruanyifeng.com/blog/2015/05/async.html)
- [当async/await遇上forEach](http://imweb.io/topic/5b3b7d624d378e703a4f4437)
- [using-async-await-with-a-foreach-loop](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop)
- [玩转异步 JS ：async/await 简明教程](https://github.com/wangshijun/course-javascript-async-await)
