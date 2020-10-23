$( document ).ready(function() {
  fetch('/mocks/summary.json')
    .then(res => res.json())
    .then(renderSummary);
  fetch('/mocks/all-tickets.json')
    .then(tickets => tickets.json())
    .then(renderAllTickets);
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

// ball tickets from json
const renderAllTickets = ({ tickets }) => {
  const container = $('.all-tickets__tickets');
  tickets.map((ticket, i) => {
    let date = new Date(ticket.deadlineDate);

    container.append(`
      <div class="all-tickets__ticket">
        <div class="all-tickets__ticket-details">
            <div class="all-tickets__ticket-photo">
                <img class="all-tickets__ticket-image" alt="" src="${ticket.photoUrl}"/>
            </div>
            <div class="all-tickets__ticket-info">
              <div class="all-tickets__ticket-title">${ticket.title}</div>
              <div class="all-tickets__last-update">Updated ${ticket.lastUpdate}</div>
            </div>
        </div>
         <div class="all-tickets__customer">
            <div class="all-tickets__customer-name">${ticket.customerName} ${ticket.customerSurname}</div>
            <div class="all-tickets__created-date">on ${ticket.createdDate}</div>
         </div>
         <div class="all-tickets__date-time">
            <div class="all-tickets__date">${moment(ticket.deadlineDate).format("MMM DD, YYYY")}</div>
            <div class="all-tickets__time">${moment(ticket.deadlineDate).format('LT')}</div>
         </div>
         <div class="all-tickets__priority all-tickets__priority-${ticket.priority}">${ticket.priority}</div>
         <div class="all-tickets__more-button">
            <i class="all-tickets__button-icon fas fa-ellipsis-v"></i>
         </div>
      </div>
      <div class="all-tickets__ticket-border"></div>
    `);
  });
}
