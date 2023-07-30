const copyButtons = document.querySelectorAll('.copy');
copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
 
    const contentToCopy = button.previousElementSibling;

    // Create a range object to select the content
    const range = document.createRange();
    range.selectNode(contentToCopy);

    // Select the content
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy the selected content
    document.execCommand('copy');

    // Clear the selection
    selection.removeAllRanges();

    // Change the button text temporarily
    button.textContent = 'تم النسخ';
    setTimeout(() => {
      button.textContent = 'نسخ';
    }, 2000);
  });
});
let user_data = JSON.parse(localStorage.getItem("user"));
const wallets= document.querySelectorAll(".wallets");
//get Wallets
getAllWallets();
function getAllWallets() {
  fetch("https://api.alphatrading0.com/api/wallets", {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${user_data.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      if(data != null){
        if (data.data.length > 0) {

          data.data.forEach(item=>{
          wallets.forEach(wallet => {
              let company = wallet.getAttribute("key");
              if(item.company===company){
                wallet.innerHTML += `
                <div class="item mb-3 col-md-12 wallets-items" >
                <div class="d-flex justify-content-between p-1">
                  <h6 class="">${item.number || item.email}</h6>
                  <i class="my-auto  fa fa-x delete-wallet" onClick="deleteWallets(${item.id})"  key=${item.id}></i>
                </div>
              </div>
                `
              }
          });
          })
        }else{
          wallets.forEach(wallet => {
            wallet.innerHTML = "<h5>لايوجد محافظ</h5>"
          });
         
        }
      }
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
}
//Add Wallets
AddWallets();
function AddWallets() {
  const add_Walets_forms = document.querySelectorAll('#wallets .add-item');

  // Add submit event listener to the form
  add_Walets_forms.forEach(form=>{
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      let company = form.getAttribute("key");
      let formData = {
        company: company
      }
      if (company=== "instapay") {
        formData.email = form.elements.wallet.value;
      } else {
        formData.number = form.elements.wallet.value;
      }
    fetch("https://api.alphatrading0.com/api/auth/admin/add-wallet", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${user_data.token}`
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
 
     alert("wallet add successfully")
     location.reload();
     
    
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
      })
  })
  








 
}

//delete Wallets
function deleteWallets(id) {
fetch(`https://api.alphatrading0.com/api/auth/admin/delete-wallet/${id}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${user_data.token}`
  }
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the API
    alert("wallet deleted successfully")
    location.reload();
})
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error); 
    
  });
}

//get all Deposits
Deposits();
function Deposits() {
  const deposits= document.querySelectorAll(".deposits");
  const search_inputs= document.querySelectorAll(".search-item");
 
  fetch("https://api.alphatrading0.com/api/auth/admin/deposits", {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${user_data.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      
      // Handle the response from the API
      let numbers = [];
      let mainarr= data.data
      if(data != null){
        if (data.data.length > 0) {
          search_inputs.forEach(element => {
            const inputValue = element.number.value;
          
            element.addEventListener('change', () => {  
              const inputValue = element.number.value;
              let key = element.getAttribute("key");
          
              const filteredData = data.data.filter(item => item.company === key);
          
              let newNumbers = [];
              filteredData.forEach(number => {
                if (inputValue === "") {
                  newNumbers = [];
                } else {
                  if (number.to === inputValue) {
                    newNumbers = data.data.filter(item => item.to === inputValue && item.company === key);
                  } else{
                   
                      deposits.forEach(deposit => {
                         let company = deposit.getAttribute("key");   
                         
                         if(number.company===company){
                        
                          
                           deposit.innerHTML = "هذه المحفظة غير موجودة"
                         }
                     });
                  
                  }
                }
              });
          
              // Update the previous version of the array
              numbers = newNumbers;
              deposits.forEach(deposit => {
                let company = deposit.getAttribute("key");   
                 
                  deposit.innerHTML += ''
               
            });
              // Display the appropriate array based on input value
              if (inputValue === "") {
                deposits.forEach(deposit => {
                  let company = deposit.getAttribute("key");   
                
                    deposit.innerHTML = ""
            
                });
                mainarr.forEach(item=>{
                
                  deposits.forEach(deposit => {
                     let company = deposit.getAttribute("key");   
                     if(item.company===company){  
                       deposit.innerHTML += `
                       <div class="item   mb-3 col-md-12" key=${item.id}>
                                                 <div class="d-lg-flex justify-content-between p-1">
                                                   <h5 class="contentToCopy">${item.to}</h5>
                                                   <p class="text-primary copy">نسخ</p>
                                                 </div>
                                                 <h6 class="">${item.company}</h6>
                                                 <h4 class="">${item.value * 31 }جنيه</h4>
                                                 <div class="control-item d-lg-flex justify-content-between p-1">
                                                   <button class=" btn accept " onClick="acceptDeposit(${item.id})"  >قبول</button>
                                                   <button class="btn not-accept "onClick="refuseDeposit(${item.id})"  key=${item.id}>رفض</button>
                                                 </div>
                                               </div>
                                               <hr>
                       `
                     }
                 });
                 })
              } else {
                
                numbers.forEach(item=>{
                  deposits.forEach(deposit => {
                     let company = deposit.getAttribute("key");   
                     
                     if(item.company===company){
                    
                      
                       deposit.innerHTML = ""
                     }
                 });
                 })
                numbers.forEach(item=>{
                  deposits.forEach(deposit => {
                     let company = deposit.getAttribute("key");   
                     
                     if(item.company===company){
                    
                      
                       deposit.innerHTML += `
                       <div class="item   mb-3 col-md-12" key=${item.id}>
                                                 <div class="d-lg-flex justify-content-between p-1">
                                                   <h5 class="contentToCopy">${item.to}</h5>
                                                   <p class="text-primary copy">نسخ</p>
                                                 </div>
                                                 <h6 class="">${item.company}</h6>
                                                 <h4 class="">${item.value * 31 }جنيه</h4>
                                                 <div class="control-item d-lg-flex justify-content-between p-1">
                                                   <button class=" btn accept " onClick="acceptDeposit(${item.id})"  >قبول</button>
                                                   <button class="btn not-accept "onClick="refuseDeposit(${item.id})"  key=${item.id}>رفض</button>
                                                 </div>
                                               </div>
                                               <hr>
                       `
                     }
                 });
                 })
              }
            });
          });
          
          // Initial display of the mainarr array
         
          mainarr.forEach(item=>{
            deposits.forEach(deposit => {
               let company = deposit.getAttribute("key");   
               if(item.company===company){
                 deposit.innerHTML += `
                 <div class="item   mb-3 col-md-12" key=${item.id}>
                                           <div class="d-lg-flex justify-content-between p-1">
                                             <h5 class="contentToCopy">${item.to}</h5>
                                             <p class="text-primary copy">نسخ</p>
                                           </div>
                                           <h6 class="">${item.company}</h6>
                                           <h4 class="">${item.value * 31 }جنيه</h4>
                                           <div class="control-item d-lg-flex justify-content-between p-1">
                                             <button class=" btn accept " onClick="acceptDeposit(${item.id})"  >قبول</button>
                                             <button class="btn not-accept "onClick="refuseDeposit(${item.id})"  key=${item.id}>رفض</button>
                                           </div>
                                         </div>
                                         <hr>
                 `
               }
           });
           })
        

         
      
    
  

        
    
        }else{
          deposits.forEach(deposit => {
            deposit.innerHTML = "<h5>لايوجد عمليات ايداع</h5>"
          });
         
        }
      }
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
}
//accept Deposit
function acceptDeposit(id) {
fetch(`https://api.alphatrading0.com/api/auth/admin/accept-deposit/${id}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${user_data.token}`
  }
})
  .then(response => response.json())
  .then(data => {
    // Handle the response from the API
    alert("Deposit was accepted successfully")
    location.reload();
})
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error); 
    
  });
}
//refuse Deposit
function refuseDeposit(id) {
  fetch(`https://api.alphatrading0.com/api/auth/admin/refuse-deposit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${user_data.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      alert("Deposit was refused successfully")
      location.reload();
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
  }
//Deposits History
 DepositsHistory();
function DepositsHistory() {
  const Historys= document.querySelectorAll(".history");
  fetch("https://api.alphatrading0.com/api/auth/admin/deposits-history", {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${user_data.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
 


      // // Set the HTML content of the div
      // vodafoneDiv.innerHTML = html;
            Historys.forEach(History => {
              let company = History.getAttribute("key");
              let companyData = data.data[company]
              if (companyData!==undefined) {
                
                for (const data of Object.values(companyData)) {
                  const keys = Object.keys(companyData);
                  // Loop through the time of day (AM/PM)
                  for (const timeOfDay in data) {
                      function date() {
                        return  `
                        <div class="d-lg-flex justify-content-between">
                        <p class="me-3">${timeOfDay ==="PM" ? 'صباحا' : 'مساءاً'}</p>
                        <p>الفترة</p>
                      </div>
                        `
                      }
                    // Loop through the individual data entries
                    for (const entry in data[timeOfDay]) {
                      
                      if (data[timeOfDay][entry].to!==undefined) {
                      History.innerHTML += `
                      <div class="item   mb-3 col-md-6">
                      <div class="d-lg-flex">
                        <p class="me-1">${ data[timeOfDay][entry].to }</p>
                        <p class="">المحفظة</p>
                     
                      </div>
                      <div class="d-lg-flex">
                          <p class="me-3">${ data[timeOfDay][entry].value * 31} جنيه</p>
                        <p >المبلغ</p>
                        
                      </div>

                        ${date()}
                        
                    </div>
                  
                      `
                    
                    }}
                   
                   
                    History.innerHTML += `
                    <div class="total text-center mb-2">
                    
                  
                    <h6>الاجمالي ${data[timeOfDay].total * 31} جنيه </h6>
                  </div>
                    `
                    // Display the total value
                       
                  
                  }
                }
             
              
              }
        
             
            
            });
         
       

    
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
}

//CashOut
CashOut();
function CashOut() {
  const cashOuts= document.querySelectorAll(".cash-out");
  fetch("https://api.alphatrading0.com/api/auth/admin/cash-outs", {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${user_data.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      if(data != null){
        if (data.data.length > 0) {
          data.data.forEach(item=>{
            cashOuts.forEach(cashOut => {
              let company = cashOut.getAttribute("key");
              if(item.company===company){
                cashOut.innerHTML += `
                <div class="item   mb-3 col-md-12">
                <div class="d-lg-flex justify-content-between p-1">
                  <h5 class="">${item.to}</h5>
                  <p class="text-primary copy">نسخ</p>
                </div>
                <div class="price d-lg-flex justify-content-between mb-2 ">
                  <h5 class="">${item.company}</h5>
                  <h5 class="">${item.value * 31 } جنيه</h5>
                </div>
    
                
              
                <div class="control-item d-lg-flex justify-content-between p-1">
                <button class="btn accept" onClick="acceptCashOut(${item.id})">قبول</button>
                  <button class="btn not-accept" onClick="refuseCashOut(${item.id})" >رفض</button>
                </div>
              </div>
                `
              }
          });
          })
        }else{
          cashOuts.forEach(cashOut => {
            cashOut.innerHTML = "<h5>لايوجد عمليات سحب</h5>"
          });
         
        }
  }

  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
}
//accept CashOut
function acceptCashOut(id) {

  fetch(`https://api.alphatrading0.com/api/auth/admin/accept-cash-out/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${user_data.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      alert("cash out was accepted successfully")
      location.reload();
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
}
  //refuse CashOut
  function refuseCashOut(id) {
   
    fetch(`https://api.alphatrading0.com/api/auth/admin/refuse-cash-out/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${user_data.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the API
        alert("cash out was refused successfully")
        location.reload();
    })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error); 
        
      });
  }

   
 