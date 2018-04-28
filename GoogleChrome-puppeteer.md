# GoogleChrome  puppeteer

* https://github.com/GoogleChrome/puppeteer

### Puppeteer
```
Puppeteer是一个node库，他提供了一组用来操纵Chrome的API，理论上使用它可以做任何Chrome可以做的事
有点类似于PhantomJS，但Puppeteer由Chrome官方团队进行维护，前景更好
Puppeteer的应用场景会非常多，就爬虫领域来说，远比一般的爬虫工具功能更丰富，性能分析、自动化测试也不在话下
```
Puppeteer官方文档请[猛戳这里](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)

### 提下Puppeteer的应用场景, 本项目会针对此做几个可用的DEMO，有些会放入博客进行详解

- 高级爬虫（有别于传统爬虫.使用Puppeteer可以拿到渲染后的效果。而传统爬虫相当于只能拿到http response，对字符串进行解析）
- UI自动化测试（使用Puppeteer可以模拟用户操作，模拟表单填写）
- 页面性能分析 (使用chrome的timeline，也就是Puppeteer提供的trace API)
- 访问 http://www.zhentaoo.com/2017/08/23/Pupputeer2/ , 有3篇更为细致的介绍

#### UI自动化测试--Puppeteer

* install
  ```
    npm i puppeteer
  ```

### 访问制定域名网站 截图
  ```
    const puppeteer = require('puppeteer');

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://www.baidu.com');
      await page.screenshot({path: 'example.png'});

      await browser.close();
    })();
  ```
#### Example - create a PDF.
```
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'hn.pdf', format: 'A4'});

    await browser.close();
  })();

```

### 项目Repo && Usage

- 1.git clone https://github.com/zhentaoo/puppeteer-deep
- 2.npm install (puppeteer在win下100+M、mac下70+M，请耐心等候)
- 3.npm run sf-juejin (推荐segmentfault的热门文章到掘金)
- 4.npm run monitor (前端监控、报警)
- 5.npm run es6 (爬取了阮一峰老师的《ES6标准入门》并打印PDF)
- 6.npm run zhentaoo (打印 www.zhentaoo.com 首页的图片)
- 7.npm run trace (生成 www.zhentaoo.com 的trace.json，并分析性能)
