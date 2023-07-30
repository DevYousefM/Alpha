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
    "مصر",
    "البحرين",
    "جزر القمر",
    "جيبوتي",
    "الجزائر",
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
    "اليمن",
    "اخرى"
];

var dropdown = document.getElementById("countriesDropdown");

for (var i = 0; i < countries.length; i++) {
    var option = document.createElement("option");
    option.text = countries[i];
    dropdown.add(option);
}

// get create user data
let userData = {
  isLoggedIn:false
 
}
localStorage.setItem("user", JSON.stringify(userData));
register();
function register() {
// Get the form element
const form = document.getElementById('registrationForm');
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('ref')) {
  const value = urlParams.get('ref');
  const code = form.elements.code;
  code.value= value;
}else{
  const code = form.elements.code;
  code.value="";
}
// Add submit event listener to the form
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form values
  const username = form.elements.username.value;
  const email = form.elements.email.value;
  const password = form.elements.password.value;
  const confirmPassword = form.elements['confirm-pass'].value;
  const day = form.elements.day.value;
  const month = form.elements.month.value;
  const year = form.elements.year.value;
  const phone = form.elements.tel.value.trim();
  const country = form.elements.country.value.trim();
  const gender = form.elements.gender.value;
  const code = form.elements.code.value;
  const message = document.querySelector(".register-message");
  // Check if the password and confirm password match
  
  if (password !== confirmPassword) {
    message.innerHTML="<h6 class='p-3'>كلمة المرور غير متطابقة</h6>";
    return false;
  }

  // Regular expression for password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  let password_error = document.querySelector(".password_error")
  // Check if the password meets the requirements
  if (!passwordRegex.test(password)) {
    password_error.innerHTML="<p class='p-1 text-danger'>يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وحرف صغير واحد وحرف كبير واحد ورقم واحد ورمز واحد.</p>";
    return false;
  }else{
    password_error.innerHTML=" "
  }

    // Validate phone
    if (phone.length !== 11) {
     
      message.innerHTML="<h6 class='p-3'> رقم الهاتف يجب ان يكون من 11  خانة</h6>";
      return false;
    }

     // Validate country
  if (country === '') {
    message.innerHTML="<h6 class='p-3'>الرجاء اختيار الدولة</h6>";
    return false;
  }


  const birthday = `${day}-${month}-${year}`;

    // Validate birthday
    const today = new Date();
    if (birthday >= today) {
      message.innerHTML="<h6 class='p-3'>تاريخ الميلاد يجب ان يكون من الماضي</h6>";
      return false;
    }
    const formData = {
      username:username,
      email:email,
      password: password,
      password_confirmation: confirmPassword,
      phone: phone,
      country: country,
      birthday: birthday,
      gender: gender
    };
   
  // Create an object with the form data
  if(code!==""){
    formData.referral_code = form.elements.code.value;
  }

  // Make a POST request to the API
  fetch('https://api.alphatrading0.com/api/auth/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the API response
      
      if (typeof data.data.email !== 'undefined' && data.data.email.length > 0 ) {
        if (data.data.email[0] ==="The email has already been taken." ) {
          message.innerHTML="<h6 class='p-3'>هذا البريد الالكتروني مسجل بالفعل</h6>";
        }
    
    }
    else if (typeof data.data.phone !== 'undefined' && data.data.phone.length > 0 ) {
      if (data.data.phone[0] ==="The phone has already been taken." ) {
        message.innerHTML="<h6 class='p-3'>هذاالرقم مسجل بالفعل</h6>";
      }
  
    }
    else{
      let userData = {
        isLoggedIn:true,
        token:data.data.access_token,
        verification_email:false,
        country:data.data.user.country,
        code:data.data.user.user_code,
      }
       localStorage.setItem("user", JSON.stringify(userData));
       window.location.href = `../pages/verify_email.html?token=${data.data.access_token}`;}
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
      // You can display an error message or perform error handling here
    });

  // Reset the form
  form.reset();
});

// Function to show error message and highlight the input field

}
login();
function login() {
  // Get the form element
  const form = document.getElementById('login');

  // Add submit event listener to the form
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get the form values
    
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const formData = {
      email:email,
      password: password,
    };
    
    // Make a POST request to the API
    fetch('https://api.alphatrading0.com/api/auth/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.ok) {
        // If the response status is in the range of 200-299
        return response.json();
      } else {
        // If the response status is outside the range of 200-299
        console.log(response);  
      }
    })
    .then(data => {
      // Handle the API response
      // Display a success message
     
     
      // Send the response data to another page
        if(data.user.verification===false){
          window.location.href = `../pages/verify_email.html?token=${data.access_token}`;
          let userData = {
            isLoggedIn:true,
            code:data.user.user_code,
            token:data.access_token,
            verification_email:false
          }
          localStorage.setItem("user", JSON.stringify(userData));
        }else{
          let userData = {
            isLoggedIn:true,
            token:data.access_token,
            code:data.user.user_code,
            country:data.user.country,
            verification_email:true
          }
          localStorage.setItem("user", JSON.stringify(userData));
       
        if (data.user.role==="admin"){
            window.location.href = `../pages/control.html`;
            console.log("admin");
        }else{
          console.log("user");
          window.location.href = `../pages/user.html?code=${data.user.user_code}`;
        }
        
       
        }
       

    })
    .catch(error => {
      // Handle any errors
      const message = document.querySelector(".login-message");
      message.innerHTML="<h6 class='p-3'>البريد الالكتروني او كلمة المرور غير صالحين  </h6>";
      console.error(error);
      // Display a failure message   
      
     
    });
  
    // Reset the form
    form.reset();
  });
  
  // Function to show error message and highlight the input field
  
}


