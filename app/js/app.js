$( document ).ready(function() {
  fetch('/mocks/summary.json')
    .then(res => res.json())
    .then(renderSummary);
});

// menu logic
$('.menu__tabs .menu__tab').on('click', function (e) {
  e.preventDefault();
  $(this).siblings().removeClass('menu__tab_active');
  $(this).addClass('menu__tab_active');
  let target = $(this).attr('data-page-id');
  $(target).addClass('content__page_active');
  $('.content > .content__page').not(target).removeClass('content__page_active');
});

// summary cards from json
const renderSummary = ({ summaryCards }) => {
  const container = $('.summary__cards');
  summaryCards.map((card, i) => {
    container.append(`
    <div class="summary__cards--card card">
        <div class="summary__cards--title">${card.name}</div>
        <div class="summary__cards--amount">${card.amount}</div>
      </div>
    `);
  });
}
