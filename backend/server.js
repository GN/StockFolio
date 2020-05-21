var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var indexRouter = require('./routes/api');
// var usersRouter = require('./routes/api/users');
var customerRoute = require('./routes/api/customer');
var managerRoute = require('./routes/api/manager');
var register = require('./routes/api/register');
var login = require('./routes/api/login');


var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api', indexRouter);
// server.use('/api/users', usersRouter);
//app.user('/customer', customerRoute);
server.use('/api/manager', managerRoute);
server.use('/api/register', register);
server.use('/api/login', login);



// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// mongoose stuffs
mongoose.connect('mongodb://127.0.0.1:27017/stocks', function (err) {
    if(err) console.log("Mongoose error: " + err);
    else console.log("Connected to Mongo!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT);

module.exports = server;
