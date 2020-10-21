document.addEventListener("DOMContentLoaded", function() {
  // this function runs when the DOM is ready, i.e. when the document has been parsed

  // all js code should go below this line
});

$(document).ready(function(){

});

$(function() {
  // Reference the tab links.
  const tabs = $('.menu__tabs li a');

  // Handle link clicks.
  tabs.click(function(event) {
    let $this = $(this);

    // Prevent default click behaviour.
    event.preventDefault();

    // Remove the active class from the active tab and section.
    $('.menu__tab a.menu__tab-link_active').removeClass('menu__tab-link_active');
    $('.menu__tab section.content__page_active').removeClass('content__page_active');

    // Add the active class to the current link and corresponding section.
    $this.addClass('menu__tab-link_active');
    $($this.attr('href')).addClass('content__page_active');
  });
});
