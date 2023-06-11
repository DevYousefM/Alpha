$(document).ready(function() {
    // all btns
    let Haccountbtn =$(".h-account-btn")
    let Raccountbtn =$(".r-account-btn")
    let Saccountbtn =$(".s-account-btn")
    let Eaccountbtn =$(".e-account-btn")
    let Btn=$(".btn-j")
    
    // all Contents
    let HaccountContent =$(".h-account")
    let RaccountContent =$(".r-account")
    let SaccountContent =$(".s-account")
    let EaccountContent =$(".e-account")
    let AllContent=$(".account-j")


    Haccountbtn.addClass("active")
    HaccountContent.addClass("show")
    $(".btn-j").click(function() {
        $(".btn-j").removeClass('active');
        $(this).addClass('active');
        var target = $(this).data('target'); // الهدف المستهدف بناءً على الزر المناسب
    
    $('.account-j').removeClass("show"); // إخفاء جميع المحتوى
    
    $('#' + target).addClass("show"); // إظهار المحتوى المتعلق بالديف المستهدف
    })
  });