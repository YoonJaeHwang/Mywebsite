/* 반응형에서 드롭다운 메뉴 */
$(document).ready(function() {
  $(".util>a").click(function() {
    $(".gnb_wrap").slideToggle("slow");
  });
});
