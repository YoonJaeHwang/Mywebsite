const crypto = require('crypto');

const CHECK_LIST = {
    app: [
        { property: 'name', reg: /^.{2,4}$/, message: '2~4이내의 이름을 입력해주세요!' },
        { property: 'email', reg: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '올바른 이메일주소를 입력해주세요!' },
        { property: 'password', reg: /[a-zA-z0-9]{4,12}/, message: '비밀번호는 4~12자입니다.' },
    ]
};

module.exports = {

    checkProperty: (data, service, strict) => {
        let result = {};
        for (const item of CHECK_LIST[service]) {
            if (data[item.property] && item.reg.exec(data[item.property])) {
                result[item.property] = data[item.property];
            } else {
                if (!strict && !data[item.property]) continue;
                return { message: item.message, data: null };
            }
        }
        return { message: 'SUCCESS', data: result };
    }

};