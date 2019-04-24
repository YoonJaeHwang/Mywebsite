// sequelize 호출
const Sequelize = require('sequelize');

const user = {
  userId: {
    type: Sequelize.STRING, // 문자열
    allowNull: false, // 값이 없으면 안됨.
    unique: true
    //validate:{
      //is: /^[0-9a-z]+$/
    //}  
  }, 
  userPw: {
    type: Sequelize.STRING,
    allowNull: false,
    //validate: {
      //is: /(?=.\d{1,50})(?=.[~`!@#$%^&()-+=]{1,50})(?=.[a-zA-Z]{2,50}).{8,50}$/
      //}
  },
  userMail: {
    type: Sequelize.STRING,
    allowNull: false,
    //validate: {
      //is: /(?=.\d{1,50})(?=.[~`!@#$%^&()-+=]{1,50})(?=.[a-zA-Z]{2,50}).{8,50}$/
      //}
  },
  userNum: {
    type: Sequelize.STRING,
    allowNull: false,
    //validate: {
      //is: /(?=.\d{1,50})(?=.[~`!@#$%^&()-+=]{1,50})(?=.[a-zA-Z]{2,50}).{8,50}$/
      //}
  }
};

module.exports = user; 
