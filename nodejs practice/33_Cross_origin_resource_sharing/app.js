var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var Filestore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var cors = require('cors');


// my own router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishes = require('./routes/dishRouter');
const leaders = require('./routes/leaderRouter');
const promotions = require('./routes/promoRouter');
const uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');


const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.all('*',(req,res,next)=>{
  if(req.secure){
    return next();
  }
  else{
    res.redirect(307,'https://'+req.hostname + ':' + app.get('secPort') + req.url);
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(express.static(path.join(__dirname, 'public'))); // open for any user to access without authentication.

// app.use(cors());
// // //CORS
// app.use(function (req,res,next) {
//   res.header('Access-Control-Allow-Origin',"*");
//   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Origin',"Content-Type");
//   next();
// })



app.use('/dishes', dishes);
app.use('/leaders', leaders);
app.use('/promotions', promotions);
app.use('/imageUpload',uploadRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
