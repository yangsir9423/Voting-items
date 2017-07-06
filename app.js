var express = require('express');
//path处理路径的
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//morgan是日志记录器,是用来在控制台打印请求日志的
var logger = require('morgan');
//解析cookie,使用此中间件会在请求对象上挂载一个cookies
var cookieParser = require('cookie-parser');
//请求体中间件 req.body
var bodyParser = require('body-parser');

var routes = require('./routes/route_app');

var app = express();
var ejs = require('ejs');

// view engine setup
//模板存放的根目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//指定渲染的方法
app.engine('.html', ejs.__express);
//设置模板引擎为html
app.set('view engine', 'html');// app.set('view engine', 'ejs');


//使用收藏夹图标的中间件 /favicon.ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//dev 是一个日志的格式
app.use(logger('dev'));
//处理请求体 json urlencoded
//当请求体类型是json的格式的时候会由json处理,当请求体的格式为查询字符串格式的话要由urlencoded来处理 k1=v1&k2=v2
//中间件通过请求头中的Content-Type来判断的
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


//获得get请求，第一个参数是匹配内容，第二个参数是匹配成功后执行的回调函数
app.get('/vote/index', routes.index);  
app.get(/\/vote\/detail/, routes.detail);  
app.get('/vote/register', routes.register);  
app.get('/vote/search', routes.search); 
app.get('/vote/rule', routes.rule);

app.get('/vote/index/data', routes.index_data);
app.get(/\/vote\/index\/poll/, routes.index_poll);
app.get(/\/vote\/index\/search/, routes.index_search);
app.get(/\/vote\/all\/detail\/data/, routes.detail_data);

app.post(/\/vote\/register\/data/, routes.register_data);
app.post('/vote/index/info', routes.index_info);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
