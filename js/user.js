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

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
  });

  userData();
  function userData() { 
    let token = JSON.parse(localStorage.getItem("user"));
    let username = document.querySelector(".user-name");
    let usercode = document.querySelector(".user-code");
    let charge = document.querySelector(".charge");
    let mobilecharge = document.querySelector(".charge-mobile ");

    let userlink = document.querySelector(".user-link");
   
    
    
    
    const urlParams = new URLSearchParams(window.location.search);
    // const responseData = JSON.parse(urlParams.get('token'));
    if (urlParams.has('code')&&token.isLoggedIn===true) {
      
      if(token){
        if(token.verification_email===false){

         window.location.href = `../pages/verify_email.html?token=${token.token}`;
         
    } else{
  let access_token=token.token.replace(/^"(.*)"$/, '$1')
  // user-data
fetch("https://api.alphatrading0.com/api/auth/user/user-profile", {
method: 'GET',
headers: {
  'Authorization': `bearer ${access_token}`
}
})
.then(response => response.json())
.then(data => {
  // Handle the response from the API
  

  username.innerHTML=data.data.username;
  usercode.innerHTML=data.data.user_code;
  userlink.innerHTML=window.location.origin+"?ref=" + data.data.user_code;
  charge.innerHTML=  "$ " + data.data.charge ;
  mobilecharge.innerHTML=  "$ " + data.data.charge ;
})
.catch(error => {
  // Handle any errors that occurred during the request
  console.error(error); 
});

// user-profits
userprofits(access_token);
// user-subscriptions
usersubscriptions(access_token);
// user-deposits
userdeposits(access_token);
 // user-Cash_Out
 userCashOut(access_token);
  
}
  }
  }else {
      window.location.href = `../pages/login.html`;
      
    }
    
  }
  logout();
  function logout() {
    const logout_button = document.getElementById("logout")
    logout_button.addEventListener('click', function() {
      console.log("ok");
      let user_Data = JSON.parse(localStorage.getItem("user"));
    fetch('https://api.alphatrading0.com/api/auth/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${user_Data.token}`
      }
    }).then(response => response.json())
    .then(data => {
      // Handle the API response  
      let userData = {
        isLoggedIn:false
      }
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = `../pages/login.html`;
      // You can display a success message or perform further actions here
     
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
      // You can display an error message or perform error handling here
    });
  }
  )}
function statusC(status) {
  if(status==="عملية مقبولة"){
    return`
    <div class="pro">
    <div class="icon"><i class="fa-solid fa-check"></i></div> 
    <h3 style="color: #00920f;">${status}</h3>
</div>
    `
  }else if(status==="عملية مرفوضة"){
    return`
    <div class="pro text-danger" >
    <div class="rejected"><i class="fa-thin fa-x"></i></div> 
    <h3 class=" text-danger">${status}</h3>
</div>
    `

  }else if(status==="قيد المراجعة"){
    return`
    <div class="pro">
    <div class="pending"><i class="fa-solid fa-clock"></i>
    </div> 
    <h3 style="color: #389ED8;">${status}</h3>
</div>
    `
  }
}
function userprofits(access_token) {
  let Profits = document.querySelector(".Profits");
  fetch("https://api.alphatrading0.com/api/auth/user/user-profits", {
method: 'POST',
headers: {
  'Authorization': `bearer ${access_token}`
}
})
.then(response => response.json())
.then(data => {
  // Handle the response from the API
 if(data.data.length > 0){
  data.data.forEach(process => {
    console.log(data);
    Profits.innerHTML += `  <div class="procces ">
    <div class=" d-flex justify-content-end ">
    <div class="pro ">
        <img class="me-2" src="../imges/despot.png" alt="" srcset="">
        
     </div>        
      <div class="pro " >
        <h3 >${process.date}</h3>
      </div>
 </div>

    <div class="pro my-auto">
        <h3> ${process.value} $ </h3>
    </div>
    <div class="pro my-auto">
       
        <h3 style="direction:rtl">${process.plan}</h3>
    </div>
</div>`
  });
 }else{
  Profits.innerHTML = "<h4 class='text-center'>لا يوجد أرباح</h4>"
 }  
})
.catch(error => {
  // Handle any errors that occurred during the request
  console.error(error); 
});
}
function usersubscriptions(access_token) {
  let subscriptions = document.querySelector(".subscriptions");
  fetch("https://api.alphatrading0.com/api/auth/user/user-subscriptions", {
  method: 'POST',
  headers: {
    'Authorization': `bearer ${access_token}`
  }
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the API
    
   if(data.data.length > 0){
    
    data.data.forEach(process => {
      
      subscriptions.innerHTML += `
      <div class="procces-s ">
                    <div class="row p-2">
                    <div class="pro col-lg-3 col-6">
                        <h3 class="duration">${process.period} </h3>
                    </div>
                    <div class="pro col-lg-3 col-6">
                        
                        <h3> ${process.value} $ </h3>
                    </div>
                    <div class="pro col-lg-3">
                        
                        <h3> ${process.expire_date}</h3>
                        
                    </div>
                    <div class="pro col-lg-3">
                       
                        <h3>${process.title}</h3>
                    </div>
                </div>
                    </div>
      `
     
    });
   }else{
    subscriptions.innerHTML = "<h4 class='text-center'>لا يوجد استثمارات</h4>"
   }  
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error); 
  });

}
function userdeposits (access_token) {
  let deposits = document.querySelector(".deposits");
  fetch("https://api.alphatrading0.com:/api/auth/user/deposits", {
  method: 'GET',
  headers: {
    'Authorization': `bearer ${access_token}`
  }
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the API
    
   if(data.data.length > 0){
    
    data.data.forEach(process => {
    
    ;
const date = new Date(process.date);
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const normalDate = date.toLocaleString(undefined, options);
      deposits.innerHTML += ` 
      <div class="procces">
      ${statusC(process.status)}
      <div class="pro">
          <h3>${process.value}$</h3>
          <h3> قيمة الايداع</h3>
      </div>
      <div class="pro">
          <h3>${normalDate}</h3>
          <h3> تاريخ الايداع</h3>
      </div>
  </div>`
    });
   }else{
    deposits.innerHTML = "<h4 class='text-center'>لا يوجد عمليات ايداع</h4>"
   }  
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error); 
  });
}
function userCashOut(access_token) {
  let Cash_Out = document.querySelector(".Cash_Out");
  fetch("https://api.alphatrading0.com/api/auth/user/cash-outs", {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${access_token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
     
     if(data.data.length > 0){
      data.data.forEach(process => {
       
        const date = new Date(process.date);
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const normalDate = date.toLocaleString(undefined, options);
        Cash_Out.innerHTML += ` 
        <div class="procces">
        ${statusC(process.status)}
        <div class="pro">
            <h3>${process.value} $</h3>
            <h3> قيمة السحب</h3>
        </div>
        <div class="pro">
            <h3>${normalDate}</h3>
            <h3> تاريخ السحب</h3>
        </div>
    </div>
 `
      });
     }else{
      Cash_Out.innerHTML = "<h4 class='text-center'>لا يوجد عمليات سحب</h4>"
     }  
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
    });
}