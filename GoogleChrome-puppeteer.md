# GoogleChrome  puppeteer

* https://github.com/GoogleChrome/puppeteer

#### UI自动化测试--Puppeteer

* install
  ```
    npm i puppeteer
  ```

- 访问制定域名网站 截图
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


### 项目Repo && Usage

- 1.git clone https://github.com/zhentaoo/puppeteer-deep
- 2.npm install (puppeteer在win下100+M、mac下70+M，请耐心等候)
- 3.npm run sf-juejin (推荐segmentfault的热门文章到掘金)
- 4.npm run monitor (前端监控、报警)
- 5.npm run es6 (爬取了阮一峰老师的《ES6标准入门》并打印PDF)
- 6.npm run zhentaoo (打印 www.zhentaoo.com 首页的图片)
- 7.npm run trace (生成 www.zhentaoo.com 的trace.json，并分析性能)
