var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/runoob');

// 监听 mongoose 连接
var db = mongoose.connection;
db.on('error',function(){
  console.error.bind(console, 'connection error:')
})

db.on('open',function(){
  console.log('mongoose is connect！')
})



// 创新 schema, model
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name : String,
  age : Number,
  DOB : Date,
  isAlive : Boolean
});

var User = mongoose.model('User', userSchema);
// mongodb 提供一种 ObjectId 类型,可以通过 Schema.ObjectId
var userData = new User({
  name : 'test',
  age : 99,
  DOB : '01/01/2915',
  isAlive : true
});

// 插入数据
// userData.save(function (err, data) {
//   if (err){
//     console.log(err);
//   } else {
//     console.log('Saved : ', data );
//   }
// });


// 查找
User.find({name:'test'},function(err,data){
  if (err){
    console.log(err);
  } else {
    console.log('findData : ', data );
  }
})

// 通过 findById (数据库中 "_id" : ObjectId("5b24bddf73217744c4b9b27c"),)
User.findById("5b24bddf73217744c4b9b27c", function (err, doc) {
  if (err) throw err;
  doc.name = 'jason bourne';
  doc.save(function (err, data) {
    if (err){
      console.log(err);
    } else {
      console.log('reSaved : ', data );
    }
  });
});
