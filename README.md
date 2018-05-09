# 基金爬虫

原作者: 杨琢

源码: https://github.com/fairyly/fundSpider

```sh

npm installl

node app

 打开浏览器 
```

### api

* http://localhost:1234/fetchFundCodes 查看所有基金代码
* http://localhost:1234/fetchFundInfo/000008  根据代码查询基金档案接口
* http://localhost:1234/fetchFundData/000008/999 基金净值变动情况数据接口(999并发量)
