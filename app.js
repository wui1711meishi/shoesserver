var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var svgCaptcha = require('svg-captcha');
var query=require('./lib/sql')

var s = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
})

var upload = multer({ storage: s})


var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');
var bannerRouter = require('./routes/banner');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
    secret:'name',
    resave:true,
    saveUninitialized:true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/api',express.static(path.join(__dirname, '/public')));


app.use('/api/login', loginRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/banner', bannerRouter);





app.get('*',function (req,res) {
    res.send('*****');
})
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
  res.send('error');
});


app.listen(9000,function () {
    console.log('ok');
})
