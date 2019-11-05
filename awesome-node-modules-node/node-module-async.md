# async

* github: https://github.com/caolan/async
* web : http://caolan.github.io/async/


### use
```
npm install --save async

ES Modules
We also provide Async as a collection of ES2015 modules, in an alternative async-es package on npm.

$ npm install --save async-es
```


### Quick Examples
```
async.map(['file1','file2','file3'], fs.stat, function(err, results) {
    // results is now an array of stats for each file
});

async.filter(['file1','file2','file3'], function(filePath, callback) {
  fs.access(filePath, function(err) {
    callback(null, !err)
  });
}, function(err, results) {
    // results now equals an array of the existing files
});

async.parallel([
    function(callback) { ... },
    function(callback) { ... }
], function(err, results) {
    // optional callback
});

async.series([
    function(callback) { ... },
    function(callback) { ... }
]);
```


demo:
```
const request = require('async-request');
const _ = require('lodash');
const fs = require('async-file');
const readlineSync = require('readline-sync');
const WordTable = require('word-table');

const header = ['车次', '出发站', '到达站', '出发时间', '到达时间', '历时', '特等座', '一等座', '二等座', '高级软卧', '软卧', '动卧', '硬卧', '硬座', '无座'];
const body = [];

let from = readlineSync.question('出发站(北京):');
let to = readlineSync.question('到达站(上海):');
const date = readlineSync.question('出发日期(2018-02-12):');

async function getStations() {
  try {
    const result = await request('https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8955');
    const data = result.body.split('@');
    data.shift(0);
    const obj = {};
    _.forEach(data, item => {
      item = item.split('|');
      obj[item[1]] = item[2];
    });
    try {
      await fs.stat('stations.json');
      // console.log('文件存在');
      const stations = await fs.readFile('stations.json', 'utf8');
      return JSON.parse(stations);
    } catch (err) {
      console.log('文件不存在');
      await fs.writeFile('test.json', JSON.stringify(obj));
      console.log("数据写入成功！");
      return obj;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getTicket() {
  let from_station = '', to_station = '';
  try {
    const stations = await getStations();
    from = stations[from];
    to = stations[to];
    const url = 'https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=' + date + '&leftTicketDTO.from_station=' + from + '&leftTicketDTO.to_station=' + to + '&purpose_codes=ADULT';
    const result = await request(url, {
      headers: {
        'verify': 'false'
      }
    });
    const data = JSON.parse(result.body);
    const arr = data.data.result;
    _.forEach(arr, item => {
      item = item.split('|');
      _.forEach(stations, (value, key) => {
        if (item[4] === value) {
          from_station = key;
        }
        if (item[5] === value) {
          to_station = key;
        }
      })
      const a = [item[3], from_station, to_station, item[8], item[9], item[10], item[32] || '--', item[31] || '--', item[30] || '--', item[21] || '--', item[23] || '--', item[33] || '--', item[28] || '--', item[29] || '--', item[26] || '--'];
      body.push(a);
    });
    var wt = new WordTable(header, body);
    console.log(wt.string());
  } catch (err) {
    console.log(err);
  }
}
getTicket();
```
