$(document).ready(function() {
    $('.question h3').click(function() {
      $(this).next('.answer').slideToggle();
    });
  });
  