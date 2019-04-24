const Sequelize = require('sequelize');

const model = require('./model');

const sequelize = new Sequelize('Hwang', 'root', 'a32821603', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql', // 내가 사용할 DB종류
});

sequelize.authenticate() // DB연결 

    .then(() => {
        console.log('DB연결 성공');
    }).catch((err) => {
        if (err) {
            console.log('DB연결 실패');
            console.log(err); 
        }
    });

sequelize.define('user', model.user); // 테이블의 이름을 유저라고 만든다. 테이블의 내용으로 model.user를 가져다쓴다.

sequelize.sync({ // 직접 테이블을 만드는 작업
    force: false // true면 DB초기화
}).then(() => { // 성공하면 실행
    console.log('table created');
}).catch((err) => { // 실패하면 오류 띄움
    if (err) {
        console.log('table create error');
        console.log(err);
    }
});


module.exports = sequelize;