let user_data = JSON.parse(localStorage.getItem("user"));
//get Single Mining 
getSingleMining();
function getSingleMining() {  
    let Single_Mining = document.getElementById("single");
fetch('https://api.alphatrading0.com:/api/single-minings')
  .then(response => response.json())
  .then(data => {
    // Process the data
    data.data.forEach(item=>{
        let convertedStr = item.final_return.replace(/\d+/g, "");
        let removedSpaces = convertedStr.replace(/\s/g, "");
        
   
      
    
        Single_Mining.innerHTML+=`

        <div class="mb-5 col-md-5 mx-auto items-mining">
       
        <div class="package" key=${item.id} id="${removedSpaces}">
            <h2>${item.mining}</h2>
            <div class="pac f">
                <div class="btn-box">
                   
                    <button class="bt2 price">
                        المزيد
                    </button>
                </div>
                <div class="img-box">
                    <h3>${removedSpaces}</h3>
                    <img  src="../imges/${removedSpaces}.png" alt="" srcset="">
                </div>
            </div>
            <div class="pac">
                <h3 > <span>${item.mining_period}</span>   </h3>
                <h3> مدة التعدين</h3>
            </div>
            <div class="pac">
                <h3> ${item.operating_expenses}</h3>
                <h3> مصاريف التشغيل</h3>
            </div>
            <div class="pac">
                <h3 >${item.hash_rate}</h3>
                <h3> معدل التجزئه</h3>
            </div>
            <div class="last">
                <div class="pac">
                    <h3 style="direction:ltr">${item.final_return}</h3>
                    <h3>  العائد النهائي</h3>
                </div>
                
            </div>
            <div class="last">
                <div class="pac">
                    <h3> ${item.mining_price} </h3>
                    <h3>  سعر الخطه</h3>
                </div>
            </div>
            <div class="btn-taden"> بدء التعدين</div>
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
//get Mass Mining 
getMassMining();
function getMassMining() {
    let Mass_Mining = document.getElementById("mass");
fetch('https://api.alphatrading0.com:/api/mass-minings')
  .then(response => response.json())
  .then(data => {

    
    data.data.forEach(item=>{
        let convertedStr = item.mining.replace("تعدين", "");
        let removedSpaces = convertedStr.replace(/\s/g, "");
        
        Mass_Mining.innerHTML+=`
        <div class="mb-5 col-md-5 mx-auto">
                        <div class="package"  key=${item.id}>
                            <h2 style="direction: rtl">${item.mining}</h2>
                            <div class="pac f">
                                <div class="btn-box">
                                    <img src="../imges/${removedSpaces}.png" alt="" srcset="">
                                    <h3 class="my-auto" style="color: white; font-size:40px">${removedSpaces}</h3>
                                </div>
                                <div class="two">
                                    <h4>المزيد</h4>
                                    
                                </div>
                            </div>
                            <div class="pac">
                                <h3 > <span>${item.mining_period}</span>   </h3>
                                <h3> مدة الاشتراك</h3>
                            </div>
                            <div class="pac">
                                <h3>${item.return_every}</h3>
                                <h3> توزيعات الارباح </h3>
                            </div>
                            <div class="pac">
                                <h3 >${item.return_percent} = ${item.return_weekly} </h3>
                                <h3> العائد الاسبوعي</h3>
                            </div>
                            <div class="last">
                                <div class="pac">
                                    <div class="h3-box">
                    
                                        <h3 style="direction: ltr;"> <img src="../imges/t.svg" alt="" srcset=""> ${item.return_final}   </h3>
                                    </div>
                                    <h3>  العائد النهائي</h3>
                                    
                                </div>
                            </div>
                            <div class="last">
                                <div class="pac">
                                    <h3> ${item.mining_price} </h3>
                                    <h3>  سعر الاشتراك</h3>
                                </div>
                            </div>
                            <div class="btn-taden"> بدء التعدين</div>
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
//subscripe Single Mining 
SubscripeSingleMining();
function SubscripeSingleMining() {
    let Mining = document.querySelector("#single");
    let message = document.querySelector(".messages")
    Mining.addEventListener('click', (event) => {
        if(user_data.isLoggedIn===true){
            if(user_data.verification_email===true){
        if (event.target.classList.contains('btn-taden')) {
            const parentDiv = event.target.closest('.package');
            const key = parentDiv.getAttribute('key');

           
                
                    fetch(`https://api.alphatrading0.com/api/auth/user/subscribe-single-mining/${key}`, {
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
                         handelMessage();
                        }
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

SubscripeMassMining();
function SubscripeMassMining() {
    let Mining = document.querySelector("#mass");
    let message = document.querySelector(".messages")
    Mining.addEventListener('click', (event) => {
        if(user_data.isLoggedIn===true){
            if(user_data.verification_email===true){
        if (event.target.classList.contains('btn-taden')) {
            const parentDiv = event.target.closest('.package');
            const key = parentDiv.getAttribute('key');

          
                
                    fetch(`https://api.alphatrading0.com/api/auth/user/subscribe-mass-mining/${key}`, {
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
                         handelMessage();
                        }
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

  function getcoins(coin ) {

    const apiKey = '604BFBC6-4571-48E8-86A8-B7A355558D10';
    const url = `https://rest.coinapi.io/v1/exchangerate/${coin}/USD`;
    
    fetch(url, {
      headers: {
        'X-CoinAPI-Key': apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

        console.log(data);
       
      })
      .catch(error => {
        console.error('Error:', error);
      });
}



