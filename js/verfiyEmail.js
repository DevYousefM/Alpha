function verfiyEmail() {
    // Get the form element

const urlParams = new URLSearchParams(window.location.search);
var token = urlParams.get('token');

const user = JSON.parse(localStorage.getItem("user"));
const accessToken = user;

const form = document.getElementById('verfiyEmail');
let message = document.querySelector(".verfiyEmail-message")
const resend = document.querySelector(".resend-code")
    // Add submit event listener to the form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
      // Get the form values
      
      const code = form.elements.verfiy_code.value; 
      const formData = {
        code:code,
      };
  
      // Make a POST request to the API
      fetch('https://api.alphatrading0.com/api/auth/user/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization':`bearer ${accessToken.token}`
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
        .then(data => {
          // Handle the API response
         if(data.message=== "كود التفعيل غير صحيح او غير صالح"){
            message.innerHTML="كود التفعيل غير صحيح او غير صالح"
         }else if (data.message==="تم تفعيل الحساب من قبل"){
           message.innerHTML="تم تفعيل الحساب من قبل"
         }else{
         
          user.verification_email = true;
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = `./user.html?code=${accessToken.code}`;
         }
          
          // You can display a success message or perform further actions here
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
          // You can display an error message or perform error handling here
        });
    
      // Reset the form
      form.reset();
    });
    resend.addEventListener('click', function(event) {
       // Prevent form submission
      
    // Get the form values
    
    const code = form.elements.verfiy_code.value; 
    const formData = {
      code:code,
    };

    // Make a POST request to the API
    fetch('https://api.alphatrading0.com/api/auth/user/send-again', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization':`bearer ${accessToken.token}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the API response
      if(data.message=== "كود التفعيل غير صحيح او غير صالح"){
        message.innerHTML="كود التفعيل غير صحيح او غير صالح"
     }else if (data.message==="تم تفعيل الحساب من قبل"){
       message.innerHTML="تم تفعيل الحساب من قبل"
     }else{
     
      user.verification_email = true;
      window.location.href = `./user.html?code=${accessToken.code}`;
     }
      
      // You can display a success message or perform further actions here
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
    verfiyEmail();