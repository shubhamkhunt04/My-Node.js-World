var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/',authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=> {
  console.log("ok");
  User.find({})
  .then((userdata) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(userdata);
  }, (err) => next(err))
  .catch((err) => next(err));
});

// Signup.............................................

router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username })
    , req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registrations successful ! ' });
          });
        });
      }
    });
});

//Login..............................................

router.post('/login', passport.authenticate('local'), (req, res) => {  // if successfully authenticated then load req.user property.

  //create token by server

  var token = authenticate.getToken({ _id: req.user._id });  // payload


  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in ! ' });
});


//Logout.......................................................

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();  // destroy session on serverside
    res.clearCookie('session-id');       // clear cookies on clientside
    res.redirect('/');
  }
  else {

    var err = new Error('You are not logged in !');
    err.status = 403;
    return next(err);
  }
})

module.exports = router;
