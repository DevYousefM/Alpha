let user_data = JSON.parse(localStorage.getItem("user"));
function getFormValues(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    const input = document.querySelector('.money');
    const text = document.querySelector('.minmax');
    // Get the form element

    const form = document.querySelector('.activate_bot');
    
    let max = parseInt(text.getAttribute("data-max"));
    let min = parseInt(text.getAttribute("data-min"));
    // Get the input values
    const money =parseInt( form.elements['money'].value);
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get('id');
    let message = document.querySelector(".messages")
    // Do something with the form values
    if(user_data.isLoggedIn===true){
      if(user_data.verification_email===true){
        if(money >= min && money <= max ){
            input.style.borderColor="white";
            text.style.color="black";
            let formData = {
              invest_value : money
            }
              fetch(`https://api.alphatrading0.com/api/auth/user/subscribe-bot/${id}`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `bearer ${user_data.token}`
                        },
                        body: JSON.stringify(formData)
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
        }else{
            input.style.borderColor="red";
            text.style.color="red";
        }
      }else{
        window.location.href = `../pages/verify_email.html?token=${user_data.token}`;
      }
    }else{
      window.location.href = `../pages/login.html`;
    }
    // You can also perform additional validation or send the form data to a server
    
    // Reset the form
    form.reset();
  }
  
  // Attach the function to the form's submit event
  const form = document.querySelector('.activate_bot');
  form.addEventListener('submit', getFormValues);

  function handelMessage() {
    let message = document.querySelector(".messages")
    message.classList.add("active-messages")
  
  setTimeout(function() {
    message.classList.remove("active-messages");
  }, 5000);
  }