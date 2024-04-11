var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var manageRouter = require('./routes/manage')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');


var app = express();


// 创建一个每分钟最多允许100个请求的限制器
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  max: 100, // 最大请求数
  message: '请求过于频繁，请稍后再试！',
  skip: (req, res) => {
    // 可选的条件，用于跳过某些请求，比如管理员或者某些特定的IP
    return false;
  }
});

// 应用限制器到所有路由
app.use(limiter);

// 设置请求体大小限制为10MB
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

const cors = require("cors");
app.use(cors()); //使用cors中间件

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/manage', manageRouter);
app.use('/api/users', usersRouter);



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

// 启动服务器
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
