let user_data = JSON.parse(localStorage.getItem("user"));
getplans();
function getplans() {
    let bots = document.getElementById("plans");
fetch('https://api.alphatrading0.com:/api/plans')
  .then(response => response.json())
  .then(data => {
    // Process the data
    
    data.data.forEach(item=>{
        bots.innerHTML+=`
        <div class="col-sm-6 mb-5 " >
                            <div class="package   pm" data-status=${item.plan_status} key=${item.id} >
                                <h2 style="    margin-bottom: 6px;">${item.plan}</h2>
                                <p>${item.plan_status}</p>
                                <div class="pac">
                                    <h3>% ${item.return_value}</h3>
                                    <h3>عائد ${item.return_type}</h3>
                                </div>
                                <div class="pac">
                                    <h3> ${item.profit_period}</h3>
                                    <h3>استلام الارباح</h3>
                                </div>
                                <div class="pac">
                                    <h3 style="direction: rtl;">${item.plan_period}</h3>
                                    <h3>مدة الخطه</h3>
                                </div>
                                <div class="last-pac">
                                    <div class="pac">
                                        <h3> % ${item.return_total}</h3>
                                        <h3>اجمالي العائد</h3>
                                    </div>
                                    <button class="btn" style="cursor:pointer">رأس المال +</button>
                                </div>
    
    
                                <h2 style="margin-bottom: -33px;">${item.plan_value} $</h2>
                                <button class="btn-s-1  ${item.plan_status==="سارية" ? "" : "non-active" }"  ${item.plan_status==="سارية" ? "" : "disabled" }  style="cursor:pointer">استثمر الان</button>
                            </div>
                        </div>
        `
    })
   
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
}


SubscripePlans();
function SubscripePlans() {
    let Mining = document.querySelector("#plans");
    let message = document.querySelector(".messages")
    Mining.addEventListener('click', (event) => {
      if(user_data.isLoggedIn===true){
        if(user_data.verification_email===true){
        if (event.target.classList.contains('btn-s-1')) {
            const parentDiv = event.target.closest('.package');
            const key = parentDiv.getAttribute('key');
         
                
                    fetch(`https://api.alphatrading0.com/api/auth/user/subscribe-plan/${key}`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `bearer ${user_data.token}`
                        }
                      }) .then((response) => {
                        if (response.ok) {
                            return response.json(); // Parse response body as JSON
                          } else {
                            throw new Error('Failed to post data');
                          }  
                      })
                      .then(data => {
                        if (data.message==="رصيد الحساب غير كافي") {

                            message.innerHTML = `
                            <div class="reject ">
                            <div class="reject-img">
                                <i class="fa fa-x "></i>
                            </div>
                            <h2>   رصيد حسابك غير كافي </h2>
                            
                            <a href="./deposit.html">
                                    
                                        
                                            <img src="../imges/despot.png" alt="" srcset="">
                                     
                                        <h3>ايداع</h3>
                                
                                </a>
                        
                        </div>`
                        handelMessage();
                        } else {
                             message.innerHTML = `
                             <div class="accept">
                             <div class="accept-img">
                                 <h2><i class="fa-solid fa-check"></i></h2>
                             </div>
                             <h2>   تم عملية الاشتراك بنجاح </h2>
                             <button>تم</button>
                         </div>`
                        }
                        handelMessage();
                      })
                      .catch(error => {
                        // Handle any errors
                        console.error(error);
                        // You can display an error message or perform error handling here
                      });
           
                
            
           
          }
          }else{
            window.location.href = `../pages/verify_email.html?token=${user_data.token}`;
          }
        }else{
          window.location.href = `../pages/login.html`;
        }
    })
     

}
function handelMessage() {
  let message = document.querySelector(".messages")
  message.classList.add("active-messages")

setTimeout(function() {
  message.classList.remove("active-messages");
}, 5000);
}
