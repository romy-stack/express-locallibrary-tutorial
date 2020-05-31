var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression');

//used to parse the cookie header and populate req.cookies

var logger = require('morgan');
//http request logger middleware for node
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter=require('./routes/catalog');
var app = express();
var mongoose =require('mongoose');

//set up default mongoose connection
//var mongoDB='mongodb+srv://romy:library@cluster0-ogirv.azure.mongodb.net/local_library?retryWrites=true&w=majority';
// var mongoDB = 'mongodb+srv://romy:library@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true';
var dev_db_url = 'mongodb+srv://romy:library@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB,{useNewUrlParser:true});

//Get the default connection
var db=mongoose.connection;

//Bind connection to error event(to get notification) 
db.on('error',console.error.bind(console,'MongoDB connection error:'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',catalogRouter);
app.use(compression()); //Compress all routes
var helmet = require('helmet');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//import the mongoose module



module.exports = app;
