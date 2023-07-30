let user_data = JSON.parse(localStorage.getItem("user"));
//get pay way

let vodafone_way = document.querySelector(".vodafone");
let orange_way =  document.querySelector(".orange");
let etislate_way =  document.querySelector(".etislate");
let we_way =  document.querySelector(".we");
let instapay_way =  document.querySelector(".instapay");
//get pay box
let instapay = document.getElementById("div6");
let vodafone = document.getElementById("div2");
let orange = document.getElementById("div3");
let etislate = document.getElementById("div4");
let we = document.getElementById("div5");
const elementsToHide = [instapay,instapay_way,vodafone_way, orange_way, etislate_way, we_way, vodafone, orange, etislate, we];
if(user_data.isLoggedIn===true){
    if(user_data.verification_email===true){
            if(user_data.country==="مصر"){
                
            }else{
                for (let i = 0; i < elementsToHide.length; i++) {
                    elementsToHide[i].style.display = 'none';
                }
            }
    }else{
        window.location.href = `../pages/verify_email.html?token=${user_data.token}`;
    }
}else{
    window.location.href = `../pages/login.html`;
   
}


//Make user Deposit
MakeDeposit();
function MakeDeposit() {
  
    let forms = document.querySelectorAll(".deposits-data");
    var payboxes = document.querySelectorAll('.method-box');
    const wallets = document.querySelectorAll(".wallet");
    payboxes.forEach(paybox => {
      paybox.addEventListener("click",function () {
        var keyValue = paybox.getAttribute('key');
        fetch("https://api.alphatrading0.com/api/wallets", {
          method: 'GET',
          headers: {
            'Authorization': `bearer ${user_data.token}`
          }
        })
          .then(response => response.json())
          .then(data => {
              // Get the random element from the array
              const wallet = data.data;
              var filterWallet = wallet.filter(function(wallet) {
                return wallet.company === keyValue ;
              });
              
              if(filterWallet.length>1){
                const randomIndex = Math.floor(Math.random() * filterWallet.length);
                  wallets.forEach(element=>{
                    if(filterWallet[randomIndex].company==="instapay"){
                      element.innerHTML=filterWallet[randomIndex].email;
                      element.setAttribute("key",filterWallet[randomIndex].email);
                    }else{
                  element.innerHTML=filterWallet[randomIndex].number;
                  element.setAttribute("key",filterWallet[randomIndex].number);
                }
                })
                
            }else{
              wallets.forEach(element=>{
                 if(filterWallet[0].company==="instapay"){
                      element.innerHTML=filterWallet[0].email;
                      element.setAttribute("key",filterWallet[0].email);
                    }else{
                  element.innerHTML=filterWallet[0].number;
                  element.setAttribute("key",filterWallet[0].number);
                }
              })
                
            }
        })
          .catch(error => {
       
            console.error(error); 
            
          });
      })
    
    });

    
    forms.forEach(form=>{
      const to_wallet = document.querySelector(".wallet");
      const usdInput = form.elements.usdvalue;
      const egpInput = form.elements.levalue;
      egpInput.addEventListener("change", function() {
      
        var egp = parseFloat(egpInput.value);
        if (!isNaN(egp)) {
          var usdPrice = egp / 31;
          // Set the USD price input value
          usdInput.value = usdPrice.toFixed(2);
        }else {
          usdInput.value = "";
        }
       
      });
      usdInput.addEventListener("change", function() {
          let usdicon = document.querySelector(".usd-icon");
        var usd = parseFloat(usdInput.value);
        if (!isNaN(usd)) {
        var egpPrice = usd * 31;
        // Set the USD price input value
        egpInput.value = egpPrice.toFixed(2);
      }else {
        egpInput.value = "";
      }
      });
    
        form.addEventListener("submit",function (event) {
            event.preventDefault();
            const countdown = form.querySelector(".countdown");
            const message =document.querySelector(".messages");
            const from = form.elements.from.value;
            const value = form.elements.usdvalue.value;
            const to = to_wallet.getAttribute("key");
            let finsih = form.querySelector(".finish");
         
            const company = form.getAttribute("key");
            // get random wallet
            
    ///
            if (countdown.textContent !== "0:00") {
            let formdata = {
                from : from,
                to : to,
                value : value,
                company: company
            }
            if(company==="instapay" && value < 100){
              
                message.innerHTML=`
                <div class="reject ">
                <div class="reject-img">
                    <i class="fa fa-x "></i>
                </div>
                <h2>الحد الادني للايداع 100 دولار</h2>
                <button class="done">تم</button>
            </div>
                ` 
                handelMessage(form);
               
             
              {

              }
            }else if (company !=="instapay" && value < 10) {
              message.innerHTML=`
              <div class="reject ">
              <div class="reject-img">
                  <i class="fa fa-x "></i>
              </div>
              <h2>الحد الادني للايداع 10 دولار</h2>
              <button class="done">تم</button>
          </div>
              ` 
              handelMessage(form);
             
            }

            else{
                
            fetch("https://api.alphatrading0.com/api/auth/user/make-deposit", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${user_data.token}`
                },
                body: JSON.stringify(formdata)
              })
              .then((response) => {
                if (response.ok) {
                  
                    message.innerHTML=`
                  <div class="pending pd">
                  <div class="pending-img">
                      <h2><i class="fa-solid fa-clock"></i></h2>
                  </div>
                  <h2>  طلبك قيد المراجعه في خلال 24 ساعه</h2>
                  <button class="done">تم</button>
               </div>
                  ` 
                  handelMessage(form);
                  }else{
                    message.innerHTML = `
                    حاول مرة اخرى`
                  }
              })
                .then(data => {
                
                  // Handle the response from the API
                  
               
                 
                
              })
                .catch(error => {
                  // Handle any errors that occurred during the request
                  
                  
                });
}
            }else{
                finsih.innerHTML =  "انتهاء صلاحية الطلب";
            }
        })
         // Reset the form
  
    })
    
}
// make user cash out 
MakeCashOut();
function MakeCashOut() {
    let forms = document.querySelectorAll(".withdraw-data");
    
    forms.forEach(form=>{
      const usdInput = form.elements.usdvalue;
      const egpInput = form.elements.levalue;
      egpInput.addEventListener("change", function() {
      
        var egp = parseFloat(egpInput.value);
        if (!isNaN(egp)) {
          var usdPrice = egp / 31;
          // Set the USD price input value
          usdInput.value = usdPrice.toFixed(2);
        }else {
          usdInput.value = "";
        }
       
      });
      usdInput.addEventListener("change", function() {
        
        var usd = parseFloat(usdInput.value);
        if (!isNaN(usd)) {
        var egpPrice = usd * 31;
        // Set the USD price input value
        egpInput.value = egpPrice.toFixed(2);
      }else {
        egpInput.value = "";
      }
      });
       
        form.addEventListener("submit",function (event) {
            event.preventDefault();
            const company = form.getAttribute("key");
            const message =document.querySelector(".messages");
          
            const to = form.elements.number.value;
            const value = form.elements.usdvalue.value;
           

            let formdata = {
                to : to,
                value : value,
                company: company
            }
            if(company==="instapay" && value < 100){
              
              message.innerHTML=`
              <div class="reject ">
                <div class="reject-img">
                    <i class="fa fa-x "></i>
                </div>
                <h2>الحد الادني للسحب 100 دولار</h2>
                <button class="btn done">تم</button>
             </div>
              ` 
              handelMessage(form);
             
           
            {

            }
          }else if (company !=="instapay" && value < 10) {
            message.innerHTML=`
            <div class="reject ">
            <div class="reject-img">
                <i class="fa fa-x "></i>
            </div>
            <h2>الحد الادني للسحب 5 دولار</h2>
            <button class="done">تم</button>
        </div>
            ` 
            handelMessage(form);
           
          }else{
            fetch("https://api.alphatrading0.com/api/auth/user/make-cash-out", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${user_data.token}`
                },
                body: JSON.stringify(formdata)
              })
              .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                  }else{
                    message.innerHTML = `
                    حاول مرة اخرى`
                  }
              })
              .then(data => {
                
                if (data.message==="رصيد الحساب غير كافي") {
                 
                    message.innerHTML = `
                    <div class="reject ">
                    <div class="reject-img">
                        <i class="fa fa-x "></i>
                    </div>
                    <h2>      رصيد حسابك غير كافي للسحب</h2>
                    
                    <a href="./deposit.html">
                            
                                
                                    <img src="../imges/despot.png" alt="" srcset="">
                             
                                <h3>ايداع</h3>
                        
                        </a>
                
                </div>`
                handelMessage(form);
                }else{
                    message.innerHTML = `
                    <div class="pending pd">
                    <div class="pending-img">
                        <h2><i class="fa-solid fa-clock"></i></h2>
                    </div>
                    <h2>  طلبك قيد المراجعه في خلال 24 ساعه</h2>
                    <button class="done">تم</button>
                 </div>
                `
              handelMessage(form);
                }
                let done = document.querySelector(".done")
                done.addEventListener('click',function () {
                    message.innerHTML=" "
                })
                 
                
              })
                .catch(error => {
                  // Handle any errors that occurred during the request
                
                 
                });
            }
        })
    })
   
}
function handelMessage(form) {
  let message = document.querySelector(".messages")
  message.classList.add("active-messages")

setTimeout(function() {
  message.classList.remove("active-messages");
}, 5000);

let done = document.querySelector(".done")
done.addEventListener('click',function () {
    message.innerHTML=" ";
    form.reset();
})
}
coinget();
function coinget() {
  const form = document.getElementById('coin');

  // Add submit event listener to the form
  if (form !==null) {
    
  
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    let message = document.querySelector(".messages")
    const value = form.elements.coinValue.value;
    if(value < 25) {
      console.log(value);
      message.innerHTML=`
      <div class="reject ">
      <div class="reject-img">
          <i class="fa fa-x "></i>
      </div>
      <h2>الحد الادني للايداع 25 دولار</h2>
      <button class="done">تم</button>
  </div>
      ` 
      handelMessage(form);
    }

    
    // Make a POST request to the API
   
  
    // Reset the form
    form.reset();
  });
}
}
creditcard()
function creditcard() {
  const form3 = document.getElementById('creditcard');
  form3.addEventListener('click', function() {
    let message = document.querySelector(".messages")
   
    console.log("ok");
   
      
      message.innerHTML=`
      <div class="reject ">
      <div class="reject-img">
          <i class="fa fa-x "></i>
      </div>
      <h2>هذه البطاقة الائتمانية مرفوضة وغير متاحة حاليا..بالرجاء اختيار طريقة دفع اخرى من القائمة</h2>
      <button class="btn done ">تم</button>
  </div>
      ` 
      
      handelMessage(form3);
    let done = document.querySelector(".done")
    done.addEventListener("click",function () {
      location.reload();

    })
    
    // Make a POST request to the API
   
  
    // Reset the form
  
  });
}
coinCashOut()
function coinCashOut() {
  const form2 = document.getElementById('coinWidraw');

  form2.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    let message = document.querySelector(".messages")
    const value = form2.elements.coinValue.value;
 
    if(value < 5) {
      
      message.innerHTML=`
      <div class="reject ">
      <div class="reject-img">
          <i class="fa fa-x "></i>
      </div>
      <h2>الحد الادني للسحب 5 دولار</h2>
      <button class="done">تم</button>
  </div>
      ` 
      handelMessage(form2);
    }

    
    // Make a POST request to the API
   
  
    // Reset the form
    form2.reset();
  });
}


