var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');

var IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init('/config/mappings.json');



var indexRouter = require('./routes/index');
var empsRouter = require('./routes/emps');
var empRouter = require('./routes/emp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var idb_host =  IBMCloudEnv.getString('IDB_HOST');
var idb_db = IBMCloudEnv.getString('IDB_DB');
var idb_usr = IBMCloudEnv.getString('IDB_USR');
var idb_psw = IBMCloudEnv.getString('IDB_PSW');

app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : idb_host,
		user     : idb_usr,
		password : idb_psw,
		database : idb_db
	});
	res.locals.connection.connect();
	next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', indexRouter);
app.use('/api/v1/emps', empsRouter);
app.use('/api/v1/emp', empRouter);

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




/*
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : idb_host,
		user     : idb_usr,
		password : idb_psw,
		database : idb_db
	});
	connection.connect();
	next();
});*/





module.exports = app;
