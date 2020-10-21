document.addEventListener("DOMContentLoaded", function() {
});

for (let elementNodeListOfElement of document.querySelectorAll('.menu__tab')) {

}

$('.menu__tabs .menu__tab').on('click', function (e) {
  e.preventDefault();
  $(this).siblings().removeClass('menu__tab_active');
  $(this).addClass('menu__tab_active');
  let target = $(this).attr('data-page');
  $(target).addClass('content__page_active');
  $('.content > div').not(target).removeClass('content__page_active');
});
