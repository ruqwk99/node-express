var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');
const cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
const port = 3334;

app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from Node.js server!' };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure('views', { 
  express: app,
  watch: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/board', (req, res) => {
  // 예제 HTML 파일을 응답으로 보냅니다.
  res.sendFile(__dirname + '/views/설정페이지.html');
});


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

module.exports = app;
