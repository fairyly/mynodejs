var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login/github',passport.authenticate('github',{session:false}));
router.get('/github/callback',passport.authenticate('github',{
  session: false,
  failureRedirect: '/'
  }),function(req,res){
  console.log(req);
  res.redirect('/users');
}
);

module.exports = router;
