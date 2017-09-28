var express = require('express');
var router = express.Router();

// mongoose connectivity
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
var Users = mongoose.model('Users', { username: String ,emailid: String,password: String});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET singup page. */

router.post('/signup', function(req, res, next) {
    console.log(req.body)
  var user = new Users({username:req.body.name, emailid:req.body.email, password:req.body.password})
  user.save(function (err) {
      if (err){
        console.log(err);
          res.render('error', { error:err });
      }else{
        console.log('sucess!!');
          res.render('welcome', {data:req.body});
      }
  })

});



router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});


/* GET singin page. */
router.get('/signin', function(req, res, next) {
    res.render('signin', { data: {err:undefined} , title: 'Express' });
});


router.post('/signin', function(req, res, next) {
    console.log(req.body)
    // var users = mongoose.model('User', {emailid: String,password: String});

    Users.findOne({emailid: req.body.email,password: req.body.password}, 'emailid password', function (err, user) {
        if (err) return handleError(err);

        if (!user){
            res.render('signin',{data:{err:"email or password invalid"}})
        }else{
            res.render('welcome',{title: req.body})
        }

        console.log(user)


        //console.log('%s %s is a %s.', user.emailid, user.password) // Space Ghost is a talk show host.

    })


    // var user = new Users({username:req.body.name, emailid:req.body.email, password:req.body.password})
    // user.save(function (err) {
    //     if (err){
    //         console.log(err);
    //         res.render('error', { error:err });
    //     }else{
    //         console.log('sucess!!');
    //         res.render('welcome', {data:req.body});
    //     }
    // })

});


router.post('/signout',function (req, res, next) {

})
module.exports = router;
