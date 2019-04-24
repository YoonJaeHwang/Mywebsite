const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const sequelize = require('./databases/connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const memberRouter = require('./routes/member');
const signinRouter = require('./routes/sign_in');

const PORT = process.env.PORT || 8080

// express 객체 생성
var app = express();

// 기본포트를 app 객체에 속성으로 설정
app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
})

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views')); // 서버가 읽을수 있도록 HTML의 위치 정의
app.set('view engine', 'ejs'); // view engine속성 값으로 ejs엔진을 사용하도록 설정

app.use(logger('dev')); // 파일로 로그를 저장
app.use(express.json()); //
app.use(express.urlencoded({ extended: false })); // extended는 중첩된 객체표현을 허용할지 말지
app.use(cookieParser()); // 쿠키 값을 쉽게 추출하기위해
app.use(express.static(path.join(__dirname, 'public'))); // Express 앱을 다른 디렉토리에서 실행하는 경우 디렉토리의 절대 경로를 사용
app.use(session({
  secret: '@#@$MYSIGN#@$#$', // 쿠키를 임의로 변조하는것을 방지하기 위한 값
  resave: false,  // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값
  saveUninitialized: true //세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장
 }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member', memberRouter);
app.use('/signin', signinRouter);

// 404를 잡고 오류처리기로 전달
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // 개발에 오류를 제공하는 지역 주민을 설정
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 오류 페이지를 렌더링
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // module.exports에 app객체 할당
