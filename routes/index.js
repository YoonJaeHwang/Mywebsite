var express = require('express');

var router = express.Router(); // 라우터 분리

const sequelize = require('../databases/connection'); // DB 사용

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {     sess: req.session.userId   }); // index라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/index', function (req, res, next) {
  res.render('index', {     sess: req.session.userId   }); // index라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/about', function (req, res, next) {
  res.render('about', {     sess: req.session.userId   }); // about라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/team', function (req, res, next) {
  res.render('team', {     sess: req.session.userId   }); // team라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/history', function (req, res, next) {
  res.render('history', {     sess: req.session.userId   }); // history라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/ranking', function (req, res, next) {
  res.render('ranking', {     sess: req.session.userId   }); // rancking라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/game', function (req, res, next) {
  res.render('game', {     sess: req.session.userId   }); // rancking라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/sign_in', function (req, res, next) {
  res.render('sign_in', {}); // sign_in라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

router.get('/sign_up', function (req, res, next) {
  res.render('sign_up', {}); // sign_up라는 ejs파일을 불러와서 json에 title값으로 express를 주겠다.
});

// DB 삽입
router.post('/databases', (req, res) => {
  sequelize.models.user.create({
    userId: req.body.id,
    userPw: req.body.pw
  }).then(() => {
    console.log('성공');
    res.send('회원가입이 완료되었습니다.');
  }).catch((err) => {
    if (err) {
      console.log(err);
      console.log('에러'); 
      res.send('아이디와 비밀번호는 4~12이내로 입력 가능합니다! .');
    }
  });
});

// 조회는 get  삽입할때 post 업데이트할 때 put 삭제할 때 delete
router.get('/user/list', (req, res) => {
  sequelize.models.user.findAll()
    .then((memo) => {// 위 동작의 결과값 -> memo
      console.log('user list success');
      res.json({
        memo
      });
    }).catch((err) => {
      if(err) {
        console.log(err);
        res.json({
          success: false,
          error: err
        });
      }
    });
});

router.post('/database', (req, res) => {
sequelize.models.user.getLabels()
  .then((labels) => {
    console.log('Memo\'s Label: ', labels[0].dataValues);
  });
});

router.post('/database', (req, res) => {
sequelize.models.user.update({
    title: 'Updated Memo'
  }, {
    where: {
      id: 1
    }
  })
  .then(() => {
    return sequelize.models.user.findOne({
      where: {
        title: 'Updated Memo'
      }
    });
  })
  .then((memo) => {
    console.log('Updated Memo: ', memo.dataValues);
  });
});

router.post('/database', (req, res) => {
sequelize.models.user.update({
    body: 'This memo is updated.'
  })
  .then((memo) => {
    console.log('Updated Memo2: ', memo.dataValues);
  });
});

module.exports = router;
