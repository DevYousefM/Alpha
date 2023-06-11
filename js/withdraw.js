$(document).ready(function() {
 
    $(".method-box").click(function() {
        $(".method-box .method-info .circle").removeClass('active');
        $(this).find('.circle').addClass('active');
        $('html, body').animate({
            scrollTop: $(document).height()
          }, );
        var target = $(this).data('target'); // الهدف المستهدف بناءً على الزر المناسب
    
    $('.pay-box').removeClass("show"); // إخفاء جميع المحتوى
    
    $('#' + target).addClass("show"); // إظهار المحتوى المتعلق بالديف المستهدف
    })
    $('h3').on('click', function() {
      var information = $(this).closest('.information');
      var instructions = information.find('.instructions');
      var arrow = $(this).find('.arrow');
    
      if (instructions.is(':visible')) {
        instructions.slideUp(function() {
          information.removeClass('active-info');
          arrow.html('&#9658;');
        });
      } else {
        instructions.slideDown(function() {
          information.addClass('active-info');
          arrow.html('&#9660;');
        });
      }
    });
    
    var countdownElement = $('.countdown');
      
      function startCountdown() {
        var minutes = 90; // 90 minutes
        var seconds = minutes * 60;
        
        var interval = setInterval(function() {
          var minutesLeft = Math.floor(seconds / 60);
          var secondsLeft = seconds % 60;
          
          countdownElement.text(minutesLeft + ":" + (secondsLeft < 10 ? "0" : "") + secondsLeft);
          
          seconds--;
          
          if (seconds < 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
      
      startCountdown();
  });