var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var passport = require('passport'),
    githubStrategy = require('passport-github').Strategy;

app.use(passport.initialize())
passport.use(new githubStrategy(
  {
    clientID:'f70f53362b0ddc23506f',
    clientSecret:'e6aed2d291ebc136a1943d567215d3a5ef6a8878',
    callbackURL: 'http://localhost:3000/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
  )
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 监听端口，启动程序
app.listen(3000, function () {
  console.log(`server listening on port 3000`)
})
module.exports = app;
