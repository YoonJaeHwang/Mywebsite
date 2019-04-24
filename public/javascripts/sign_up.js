function Sign_up() {
  var form = document.signup; //form의 name부분 form으로 변수 지정
  var emailtext = /^[A-Za-z0-9_\.\-]+@[A-Za-z\-]+\.[A-Za-z\-]+/; // 이메일 형식
  var num = /^\d{3}\d{3,4}\d{4}$/; // 전화번호 형식

  //아이디에서 입력 필수 조건문
  if (form.my_id.value == "") {
    alert("아이디를 입력해야 합니다!");
    form.my_id.focus(); //포커스를 id박스로 이동.
    return;
  }

  //아이디 입력 문자수를 4~12자로 제한하는 조건문
  if (form.my_id.value.length < 4 || form.my_id.value.length > 12) {
    alert("아이디는 4~12자 이내로 입력 가능합니다!");

    form.my_id.select(); //입력한 문자를 선택 상태로 만듬.
    return;
  }

  //입력된 문자의 길이만큼 루프를 돌면서 검사
  for (i = 0; i < form.my_id.value.length; i++) {
    var ch = form.my_id.value.charAt(i); //문자를 반환(정수형), 범위 검사 가능

    //입력된 문자를 검사
    if ((ch < "a" || ch > "z") && (ch < "A" || ch > "Z") && (ch < "0" || ch > "9")) {
      alert("아이디는 영문 소문자로만 입력 가능 합니다!");
      form.my_id.select();
      return;
    }
  }

  //입력된 첫번째 문자가 숫자인지 검사하는 조건문
  if (!isNaN(form.my_id.value.substr(0, 1))) {
    alert("아이디는 숫자로 시작할 수 없습니다!");
    form.my_id.select();
    return;
  }

  //패스워드 검사 -------------------------------------------------------------------------

  if (form.my_pw.value == "") {
    alert("비밀번호를 입력 해야 합니다!");
    form.my_pw.focus(); //포커스를 Password박스로 이동.
    return;
  }

  if (form.my_pw.value.length < 4 || form.my_pw.value.length > 12) {
    alert("비밀번호는 4~12자 이내로 입력 가능 합니다!");
    form.my_pw.select();
    return;
  }

  if (form.my_pw.value != form.my_rp.value) {
    alert("비밀번호가 일치 하지 않습니다!");
    form.my_rp.focus(); //포커스를 repassword박스로 이동.
    return;
  }

  // 이메일 검사

  if (form.my_email.value == "") {
    alert("이메일을 입력 해야 합니다!");
    form.my_email.focus(); //포커스를 email박스로 이동.
    return;
  }

  if (emailtext.test(form.my_email.value) == false) {
    //이메일 형식이 알파벳+숫자@알파벳.알파벳 형식이 아닐경우
    alert("이 메일형식이 올바르지 않습니다.");
    form.my_email.focus();
    exit;
  }

  // 전화번호 검사 -----------------------------------------------------------------------------

  if (form.my_num.value == "") {
    alert("전화번호를 입력 해야 합니다!");
    form.my_num.focus(); //포커스를 phonenumber박스로 이동.
    return;
  }

  if (num.test(form.my_num.value) == false) {
    //전화번호 형식이 {2,3}-{3,4}-{4} 형식이 아닐경우
    alert("전화번호 형식이 올바르지 않습니다.");
    form.my_num.focus();
    return;
  }

  alert("회원가입이 완료되었습니다.");
}
