const {Router} = require('express');
const sequelize = require('../databases/connection');

const app = Router();

app.post('/', (req, res) => {
  console.log(req.body);
  const my_id = req.body.my_id; // 유저가 보낸 아이디
  const my_pw = req.body.my_pw; // 유저가 보낸 비밀번호
  const my_rp = req.body.my_rp; // 유저가 보낸 비밀번호 재입력
  const my_email = req.body.my_email; // 유저가 보낸 이메일
  const my_num = req.body.my_num; // 유저가 보낸 전화번호

  let emailtext = /^[A-Za-z0-9_\.\-]+@[A-Za-z\-]+\.[A-Za-z\-]+/; // 이메일 형식
  let num = /^\d{3}\d{3,4}\d{4}$/; // 전화번호 형식

  //아이디 검사 -----------------------------------------------------------------------------
  if (my_id == "") {
    res.status(400).json({message: "아이디를 입력해주세요."});
  }

  //아이디 입력 문자수를 4~12자로 제한하는 조건문
  else if (my_id.length < 4 || my_id.length > 12) {
    res.status(400).json({message: "아이디는 4~12자 이내로 입력 가능합니다!"});
  }

  // 입력된 첫번째 문자가 숫자인지 검사하는 조건문
  else if (!isNaN(my_id.substr(0, 1))) {
    res.status(400).json({message: "아이디는 숫자로 시작할 수 없습니다!"});
  }

  //패스워드 검사 -------------------------------------------------------------------------
  else if (my_pw == "") {
    res.status(400).json({message: "비밀번호를 입력 해야 합니다!"});
  }

  else if (my_pw.length < 4 || my_pw.length > 12) {
    res.status(400).json({message: "비밀번호는 4~12자 이내로 입력 가능 합니다!"});
  }

  else if (my_pw != my_rp) {
    res.status(400).json({message: "비밀번호가 일치 하지 않습니다!"});
  }

  // 이메일 검사 -----------------------------------------------------------------------------
  else if (my_email == "") {
    res.status(400).json({message: "이메일을 입력 해야 합니다!"});
  }

  else if (emailtext == false) {
  //이메일 형식이 알파벳+숫자@알파벳.알파벳 형식이 아닐경우
    res.status(400).json({message: "이메일형식이 올바르지 않습니다."});
  }

  // 전화번호 검사 -----------------------------------------------------------------------------
  else if (my_num == "") {
    res.status(400).json({message: "전화번호를 입력 해야 합니다!"});
  }

  else if (num.test(my_num) == false) {
  //전화번호 형식이 {2,3}-{3,4}-{4} 형식이 아닐경우
  res.status(400).json({message: "전화번호 형식이 올바르지 않습니다."});
  } 
  else { //성공시 밑 코드 실행
    sequelize.models.user.create({ // user라는 테이블만든곳에 필드 연동
      userId: req.body.my_id,
      userPw: req.body.my_pw,
      userMail: req.body.my_email,
      userNum: req.body.my_num
    }).then(() => {
      res.render("welcome");
    }).catch((err) => {
      if (err) {
        console.log(err)
      }
    });
  }
});

module.exports = app;
