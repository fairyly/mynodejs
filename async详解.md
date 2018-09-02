# async详解

>async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

Thunk 函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式

## 简介
- async 函数是什么？一句话，它就是 Generator 函数的语法糖。

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

- 并发执行 await 命令

```
// 方法 1
let [res1, res2] = await Promise.all([func1(), func2()])

// 方法 2
let func1Promise = func1()
let func2Promise = func2()
let res1 = await func1Promise
let res2 = await func2Promise

作者：次人君在野原之森网络工作室
链接：https://www.jianshu.com/p/5fb1586b9164
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
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

## 参考资料
- http://es6.ruanyifeng.com/#docs/async
- https://github.com/nswbmw/node-in-debugging/blob/master/3.2%20Async%20%2B%20Await.md
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
- https://www.jianshu.com/p/5fb1586b9164
