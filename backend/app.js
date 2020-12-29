var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var touristPackageRouter = require('./routes/touristPackage');
var authRouter = require('./routes/auth');
var feedbackRouter = require('./routes/feedback');

// require api routers
var touristPackageApiRouter = require('./routes/api/touristPackage');
var companyApiRouter = require('./routes/api/company');

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
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/tourist_package', touristPackageRouter);
app.use('/auth', authRouter);
app.use('/feedback', feedbackRouter);

// Api endpoints
app.use('/api/tourist_package', touristPackageApiRouter);
app.use('/api/company', companyApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/');
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

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});

module.exports = app;
