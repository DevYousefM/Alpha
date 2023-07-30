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
        var minutes = 60; // 90 minutes
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

  // select dropdown

// years dropdown
var currentYear = new Date().getFullYear();
var select = document.getElementById("years");
for (var i = currentYear; i <= 2035; i++) {
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  select.add(option);

}
// months dropdown

var select = document.getElementById("months");
for (let i = 1; i <= 12; i++) {
  var option = document.createElement("option");
  option.text = i < 10 ? "0" + i : i;
  option.value = i < 10 ? "0" + i : i;
  select.add(option);
}

