# GoogleChrome  puppeteer

* https://github.com/GoogleChrome/puppeteer

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
