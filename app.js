const express = require('express'); //搭建服务
const events = require('events'); //事件监听
const request = require('request'); //发送请求
const iconv = require('iconv-lite'); //网页解码
const cheerio = require('cheerio'); //网页解析
const MongoClient = require('mongodb').MongoClient; //数据库
const app = express(); //服务端实例
const Event = new events.EventEmitter(); //事件监听实例
const dbUrl = "mongodb://localhost:27017/"; //数据库连接地址


// 基金爬虫
class FundSpider {
    // 数据库名，表名，并发片段数量
    constructor(dbName='fund', collectionName='fundData', fragmentSize=1000) {
        this.dbUrl = "mongodb://localhost:27017/";
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.fragmentSize = fragmentSize;
    }
    // 获取url对应网址内容，除utf-8外，需指定网页编码
    fetch(url, coding, callback) {
        request({url: url, encoding : null}, (error, response, body) => {
            let _body = coding==="utf-8" ? body : iconv.decode(body, coding);
            if (!error && response.statusCode === 200){
                // 将请求到的网页装载到jquery选择器中
                callback(null, cheerio.load('<body>'+_body+'</body>'));
            }else{
                callback(error, cheerio.load('<body></body>'));
            }
        });
    }

    // 批量获取所有的基金代码
    fetchFundCodes(callback) {
        let url = "http://fund.eastmoney.com/allfund.html";
        // 原网页编码是gb2312，需对应解码
        this.fetch(url, 'gb2312', (err, $) => {
            let fundCodesArray = [];
            if(!err){
                $("body").find('.num_right').find("li").each((i, item)=>{
                    let codeItem = $(item);
                    let codeAndName = $(codeItem.find("a")[0]).text();
                    let codeAndNameArr = codeAndName.split("）");
                    let code = codeAndNameArr[0].substr(1);
                    let fundName = codeAndNameArr[1];
                    if(code){
                        fundCodesArray.push(code);
                    }
                });
            }
            callback(err, fundCodesArray);
        });
    }

    // 根据基金代码获取对应基本信息
    fetchFundInfo(code, callback){
        let fundUrl = "http://fund.eastmoney.com/f10/" + code + ".html";
        let fundData = {fundCode: code};
        this.fetch(fundUrl,"utf-8", (err, $) => {
            if(!err){
                let dataRow = $("body").find(".detail .box").find("tr");
                fundData.fundName = $($(dataRow[0]).find("td")[0]).text();//基金全称
                fundData.fundNameShort = $($(dataRow[0]).find("td")[1]).text();//基金简称
                fundData.fundType = $($(dataRow[1]).find("td")[1]).text();//基金类型
                fundData.releaseDate = $($(dataRow[2]).find("td")[0]).text();//发行日期
                fundData.buildDate = $($(dataRow[2]).find("td")[1]).text();//成立日期/规模
                fundData.assetScale = $($(dataRow[3]).find("td")[0]).text();//资产规模
                fundData.shareScale = $($(dataRow[3]).find("td")[1]).text();//份额规模
                fundData.administrator = $($(dataRow[4]).find("td")[0]).text();//基金管理人
                fundData.custodian = $($(dataRow[4]).find("td")[1]).text();//基金托管人
                fundData.manager = $($(dataRow[5]).find("td")[0]).text();//基金经理人
                fundData.bonus = $($(dataRow[5]).find("td")[1]).text();//分红
                fundData.managementRate = $($(dataRow[6]).find("td")[0]).text();//管理费率
                fundData. trusteeshipRate = $($(dataRow[6]).find("td")[1]).text();//托管费率
                fundData.saleServiceRate = $($(dataRow[7]).find("td")[0]).text();//销售服务费率
                fundData.subscriptionRate = $($(dataRow[7]).find("td")[1]).text();//最高认购费率
            }
            callback(err, fundData);
        });
    }

    // 并发获取的基金信息片段保存到数据库指定的表
    fundFragmentSave(collection, codesArray){
        for (let i = 0; i < codesArray.length; i++) {
            this.fetchFundInfo(codesArray[i], (error, fundData) => {
                if(error){
                    Event.emit("error_fundItem", codesArray[i]);
                    Event.emit("fundItem", codesArray[i]);
                }else{
                    // 指定每条数据的唯一标志是基金代码，便于查询与排序
                    fundData["_id"] = fundData.fundCode;
                    collection.save(fundData, (err, res) => {
                        Event.emit("correct_fundItem", codesArray[i]);
                        Event.emit("fundItem", codesArray[i]);
                        if (err) throw err;
                    });
                }
            });
        }
    }

    // 并发获取给定基金代码数组中对应的基金基本信息，并保存到数据库
    fundToSave(error, codesArray=[]){
        if(!error){
            let codesLength = codesArray.length;
            let itemNum = 0; // 已爬过的数量
            let errorItems = []; // 爬取失败的基金代码数组
            let errorItemNum = 0; // 爬取失败的基金代码数量
            let correctItems = []; // 爬取成功的基金代码数组
            let correctItemNum = 0; // 爬取成功的基金代码数量
            console.log(`基金代码共计 ${codesLength} 个`);
            // 数据库连接
            MongoClient.connect(this.dbUrl,  (err, db) => {
                if (err) throw err;
                // 数据库实例
                let fundDB = db.db(this.dbName);
                // 数据表实例
                let dbCollection = fundDB.collection(this.collectionName);
                // 并发控制器实例
                let concurrentCtrl = new ConcurrentCtrl(this, this.fragmentSize, this.fundFragmentSave, codesArray, dbCollection);
                // 事件监听
                Event.on("fundItem", (_code) => {
                    // 计数
                    itemNum++;
                    console.log(`index: ${itemNum} --- code: ${_code}`);
                    // 并发控制
                    concurrentCtrl.go(itemNum);
                    // 所有基金信息爬取完毕
                    if (itemNum >= codesLength) {
                        console.log("save finished");
                        if(errorItems.length > 0){
                            console.log("---error code----");
                            console.log(errorItems);
                        }
                        // 关闭数据库
                        db.close();
                    }
                });
                Event.on("error_fundItem", (_code) => {
                    errorItems.push(_code);
                    errorItemNum++;
                    console.log(`error index: ${errorItemNum} --- error code: ${_code}`);
                });
                Event.on("correct_fundItem", (_code) => {
                    correctItemNum++;
                });
                // 片段式并发启动
                concurrentCtrl.go(0);
            });
        }else{
            console.log("fundToSave error");
        }
    }

    // 未传参则获取所有基金基本信息，给定基金代码数组则获取对应信息，均更新到数据库
    fundSave(_codesArray){
        if(!_codesArray){
            // 所有基金信息爬取保存
            this.fetchFundCodes((err, codesArray) => {
                this.fundToSave(err, codesArray);
            })
        }else{
            // 过滤可能的非数组入参的情况
            _codesArray = Object.prototype.toString.call(_codesArray)==='[object Array]' ? _codesArray : [];
            if(_codesArray.length > 0){
                // 部分基金信息爬取保存
                this.fundToSave(null, _codesArray);
            }else{
                console.log("not enough codes to fetch");
            }
        }
    }


    // 日期转字符串
    getDateStr(dd){
        let y = dd.getFullYear();
        let m = (dd.getMonth()+1)<10 ? "0"+(dd.getMonth()+1) : (dd.getMonth()+1);
        let d = dd.getDate()<10 ? "0"+dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
    }
    // 爬取并解析基金的单位净值，增长率等信息
    fetchFundUrl(url, callback){
        this.fetch(url, 'gb2312', (err, $)=>{
            let fundData = [];
            if(!err){
                let table = $('body').find("table");
                let tbody = table.find("tbody");
                try{
                    tbody.find("tr").each((i,trItem)=>{
                        let fundItem = {};
                        let tdArray = $(trItem).find("td").map((j, tdItem)=>{
                            return $(tdItem);
                        });
                        fundItem.date = tdArray[0].text(); // 净值日期
                        fundItem.unitNet = tdArray[1].text(); // 单位净值
                        fundItem.accumulatedNet = tdArray[2].text(); // 累计净值
                        fundItem.changePercent  = tdArray[3].text(); // 日增长率
                        fundData.push(fundItem);
                    });
                    callback(err, fundData);
                }catch(e){
                    console.log(e);
                    callback(e, []);
                }
            }
        });
    }
    // 根据基金代码获取其选定日期范围内的基金变动数据
    // 基金代码，开始日期，截止日期，数据个数，回调函数
    fetchFundData(code, sdate, edate, per=9999, callback){
        let fundUrl = "http://fund.eastmoney.com/f10/F10DataApi.aspx?type=lsjz";
        let date = new Date();
        let dateNow = new Date();
        // 默认开始时间为当前日期的3年前
        sdate = sdate?sdate:this.getDateStr(new Date(date.setFullYear(date.getFullYear()-3)));
        edate = edate?edate:this.getDateStr(dateNow);
        fundUrl += ("&code="+code+"&sdate="+sdate+"&edate="+edate+"&per="+per);
        console.log(fundUrl);
        this.fetchFundUrl(fundUrl, callback);
    }
}




// 并发控制器，控制单次并发调用的数量
class ConcurrentCtrl {
    // 调用者上下文环境，并发分段数量（建议不要超过1000），调用函数，总参数数组，数据库表名
    constructor(parent, splitNum, fn, dataArray=[], collection){
        this.parent = parent;
        this.splitNum = splitNum;
        this.fn = fn;
        this.dataArray = dataArray;
        this.length = dataArray.length; // 总次数
        this.itemNum = Math.ceil(this.length/splitNum); // 分段段数
        this.restNum = (this.length%splitNum)===0 ? splitNum : (this.length%splitNum); // 最后一次分段的余下次数
        this.collection = collection;
    }
    // go(0)启动调用，循环计数中达到分段数量便进行下一次片段并发
    go(index) {
        if((index%this.splitNum) === 0){
            if(index/this.splitNum !== (this.itemNum-1)){
                this.fn.call(this.parent, this.collection, this.dataArray.slice(index,index+this.splitNum));
            }else{
                this.fn.call(this.parent, this.collection, this.dataArray.slice(index,index+this.restNum));
            }
        }
    }

    

}


// let fundSpider = new FundSpider("fund","fundData",1000);
// // 更新保存全部基金基本信息
// fundSpider.fundSave();
// 更新保存代码为000001和040008的基金的基本信息
// fundSpider.fundSave(['000001','040008']);





/*let fundSpider = new FundSpider();
fundSpider.fetchFundData('040008', '2018-03-20', '2018-05-04', 30, (err, data) => {
    console.log(data);
});*/

// 所有基金代码查询接口
app.get('/fetchFundCodes', (req, res) => {
    let fundSpider = new FundSpider();
    res.header("Access-Control-Allow-Origin", "*");
    fundSpider.fetchFundCodes((err, data)=>{
        res.send(data.toString());
  });
});
// 根据代码查询基金档案接口
app.get('/fetchFundInfo/:code', (req, res) => {
    let fundSpider = new FundSpider();
    res.header("Access-Control-Allow-Origin", "*");
    fundSpider.fetchFundInfo(req.params.code, (err, data) => {
        res.send(JSON.stringify(data));
    });
});
// 基金净值变动情况数据接口
app.get('/fetchFundData/:code/:per', (req, res) => {
    let fundSpider = new FundSpider();
    res.header("Access-Control-Allow-Origin", "*");
    fundSpider.fetchFundData(req.params.code, undefined, undefined, req.params.per, (err, data) => {
        res.send(JSON.stringify(data));
    });
});
app.listen(1234,()=>{
  console.log("service start on port 1234");
});


