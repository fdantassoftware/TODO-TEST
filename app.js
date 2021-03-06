var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var main = require('./routes/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// Here we set our endpoints

app.get('/getAllTasks', main.getAllTasks);
app.get('/getAllCompletedTasks', main.getAllCompletedTasks);



app.post('/getTaskByID', main.getTaskByID);
app.post('/createNewTask', main.createNewTask);
app.post('/updateTaskStatus', main.updateTaskStatus);
app.post('/deleteTaskByID', main.deleteTaskByID);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT || 5100, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
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

module.exports = app;
