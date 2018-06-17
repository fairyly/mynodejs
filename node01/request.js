var express = require('express');
var path = require('path');
var superagent = require('superagent');
var axios = require('axios');

var app = express();

// 模板引擎
app.set('view engine','ejs');

// 放模板文件的目录
// console.log(__dirname,__filename,path.join(__dirname,'public'))
app.set('views',path.join(__dirname,'views'))

app.get('/', function (req, res, next) {
  // superagent.get('https://cnodejs.org/api/v1/topics')
  //   .send({
  //     "page": 1,
  //     "tab": 'share' ,
  //     "limit": 20,
  //     "mdrender": true
  //   })
  //   .end(function (err, sres) {
  //     if (err) {
  //       return next(err);
  //     }
  //     console.log(sres.body.data)
  //     res.render('index',{data:sres.body.data});
  //   });
  axios.get('https://cnodejs.org/api/v1/topics', {
    params: {
      "page": 1,
      "tab": 'share' ,
      "limit": 20,
      "mdrender": true
    }
  })
  .then(function (response) {
    console.log(response);
    res.render('index',{data:response.data.data});
  })
  .catch(function (error) {
    console.log(error);
  });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
