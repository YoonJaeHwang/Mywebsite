/* 스크롤 이벤트 발생 */
window.addEventListener('scroll', function () { // scroll 형식 사용
  var el = document.querySelector('header'); // 

  if (window.scrollY > 0) el.classList.add('shown');
  else el.classList.remove('shown');
});
