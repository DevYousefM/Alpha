$(document).ready(function() {
    // عند النقر على زرار "انشاء حساب"
    $("#loginButton").addClass("active")
    $("#content-login").addClass("show")
    $("#signupButton").click(function() {
      // إزالة الألوان النشطة من زرار "تسجيل الدخول"
      $("#loginButton").removeClass("active");
      // إضافة اللون النشط لزرار "انشاء حساب"
      $("#signupButton").addClass("active");
      // تغيير محتوى الـ div لـ "انشاء حساب"
      $("#content-login").removeClass("show");
      $("#content-create").addClass("show");
    
  
    });
  
    // عند النقر على زرار "تسجيل الدخول"
    $("#loginButton").click(function() {
      // إزالة الألوان النشطة من زرار "انشاء حساب"
      $("#signupButton").removeClass("active");
      // إضافة اللون النشط لزرار "تسجيل الدخول"
      $("#loginButton").addClass("active");
      // تغيير محتوى الـ div لـ "تسجيل الدخول"
    
      $("#content-create").removeClass("show");
      $("#content-login").addClass("show");
    })
  });
  var countries = [
    "الجزائر",
    "البحرين",
    "جزر القمر",
    "جيبوتي",
    "مصر",
    "العراق",
    "الأردن",
    "الكويت",
    "لبنان",
    "ليبيا",
    "المغرب",
    "موريتانيا",
    "عمان",
    "فلسطين",
    "قطر",
    "السعودية",
    "الصومال",
    "السودان",
    "سوريا",
    "تونس",
    "الإمارات العربية المتحدة",
    "اليمن"
];

var dropdown = document.getElementById("countriesDropdown");

for (var i = 0; i < countries.length; i++) {
    var option = document.createElement("option");
    option.text = countries[i];
    dropdown.add(option);
}