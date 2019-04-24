const {Router} = require('express');
const sequelize = require('../databases/connection');

const app = Router();

app.post('/', (req, res) => {
    sequelize.models.user.findOne({ // user라는 테이블에서 사용자가 보낸 값이랑 일치하는 사용자를 찾기
      where: {userId: req.body.my_id}
    }).then((result) => {
        console.log(result);
        if(result.dataValues.userPw === req.body.my_pw) {
            console.log('로그인 성공')

            req.session.userId = req.body.my_id

            res.redirect("/index");
        } else {
            res.redirect("/sign_up");
        }
    }).catch((err) => {
      if (err) {
          res.redirect("/sign_up");
      }
    });
});

module.exports = app;
