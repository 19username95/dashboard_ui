$( document ).ready(function() {
  fetch('/mocks/summary.json')
    .then(res => res.json())
    .then(renderSummary);
  fetch('/mocks/unresolved-tickets.json')
    .then(res => res.json())
    .then(renderUnresolvedTickets);
  fetch('/mocks/tasks.json')
    .then(res => res.json())
    .then(renderTasks);

  reRenderAllTickets();
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

// all tickets
let currentPage = 1;
let elementsPerPage = 8;

 // $('all-tickets__tickets-per-page-selector').on('click', function (e) {
 //   e.preventDefault();
 //
 // })

function prevPage()
{
  currentPage--;
  reRenderAllTickets();
}

function nextPage()
{
  currentPage++;
  reRenderAllTickets();
}

function reRenderAllTickets () {
  fetch('/mocks/all-tickets.json')
    .then(res => res.json())
    .then(renderAllTickets);
}

const renderAllTickets = ({tickets}) => {
  let numPages = Math.ceil(tickets.length / elementsPerPage);

  if ( currentPage > numPages ) {
    currentPage--;
    return;
  }
  if ( currentPage <= 0 ) {
    currentPage = 1;
    return ;
  }

  let pagesRanges = document.getElementById("current-tickets-page");
  let ticketStart = (currentPage-1) * elementsPerPage + 1;
  let ticketEnd = (currentPage * elementsPerPage) < tickets.length ?
                  (currentPage * elementsPerPage) : tickets.length;
  pagesRanges.innerHTML = (ticketStart + '-' + ticketEnd + ' of ' + tickets.length);
 // $('current-tickets-page').append(`${currentPage} of ${numPages}`);

  const container = $('.all-tickets__tickets').empty();

  for (let i = (currentPage-1) * elementsPerPage; i < (currentPage * elementsPerPage) && i < tickets.length; i++) {
    let date = new Date(tickets[i].deadlineDate);

    container.append(`
      <div class="all-tickets__ticket">
        <div class="all-tickets__ticket-details">
            <div class="all-tickets__ticket-photo">
                <img class="all-tickets__ticket-image" alt="" src="${tickets[i].photoUrl}"/>
            </div>
            <div class="all-tickets__ticket-info">
              <div class="all-tickets__ticket-title">${tickets[i].title}</div>
              <div class="all-tickets__last-update">Updated ${tickets[i].lastUpdate}</div>
            </div>
        </div>
         <div class="all-tickets__customer">
            <div class="all-tickets__customer-name">${tickets[i].customerName} ${tickets[i].customerSurname}</div>
            <div class="all-tickets__created-date">on ${tickets[i].createdDate}</div>
         </div>
         <div class="all-tickets__date-time">
            <div class="all-tickets__date">${moment(date).format("MMM DD, YYYY")}</div>
            <div class="all-tickets__time">${moment(date).format('LT')}</div>
         </div>
         <div class="all-tickets__priority all-tickets__priority-${tickets[i].priority}">${tickets[i].priority}</div>
         <div class="all-tickets__more-button">
            <i class="all-tickets__button-icon fas fa-ellipsis-v"></i>
         </div>
      </div>
      <div class="all-tickets__ticket-border"></div>
    `);
  }
}

// unresolved tickets from json
const renderUnresolvedTickets = ({unresolvedTickets}) => {
  const container = $('.unresolved-tickets__items');
  unresolvedTickets.map((ticket, i) => {
    container.append(`
    <div class="unresolved-tickets__item">
      <div class="unresolved-tickets__item-title">${ticket.name}</div>
      <div class="unresolved-tickets__item-count">${ticket.count}</div>
    </div>
    <div class="unresolved-tickets__item-border"></div>
    `);
  });
}

// tasks from json
const renderTasks = ({tasks}) => {
  const container = $('.tasks__tasks-list');
  tasks.map((task, i) => {
    let ifChecked = task.completed===true?'checked':'';

    container.append(`
      <div class="tasks__list-border"></div>
      <div class="tasks__task task">
        <input type="checkbox" class="task__checkbox" `+ ifChecked +`>
        <div class="task__title">${task.title}</div>
        <div class="task__status task__status-${task.status}">${task.status}</div>
      </div>
    `);
  });
}
