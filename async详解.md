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

## 简介
- async 函数是什么？一句话，它就是 Generator 函数的语法糖。

  generator 函数需要通过调用next()方法，才能往后执行到下一个yield，但是 async 函数却不需要，它能够自动向后执行
  
  await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用

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

- foreach 是同步操作并发操作
```
demo:
function test() {
  return new Promise(function(resolve,reject){
    if (true){
      resolve(true);
    } else {
      reject(false);
    }
  })
}

async function demo() {
 let flag = await test()
 console.log(flag)
}

demo()
```


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

## 参考资料
- http://es6.ruanyifeng.com/#docs/async
- https://github.com/nswbmw/node-in-debugging/blob/master/3.2%20Async%20%2B%20Await.md
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
- https://www.jianshu.com/p/5fb1586b9164
- https://github.com/tc39/ecmascript-asyncawait
- [async-await](https://javascript.info/async-await)
- [async 函数的含义和用法](www.ruanyifeng.com/blog/2015/05/async.html)
- [当async/await遇上forEach](http://imweb.io/topic/5b3b7d624d378e703a4f4437)
