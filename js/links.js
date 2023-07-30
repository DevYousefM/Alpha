
// Get the profile page link element from the header
const profileLinks = document.querySelectorAll(".user-page");
// Update the link URL with the access token
let user = JSON.parse(localStorage.getItem("user"));

if(user.token !== null){
    profileLinks.forEach((link)=>{
        if ( window.location.pathname === '/index.html' ){
            link.href = `pages/user.html?code=${user.code}`;
        }else{
            link.href = `user.html?code=${user.code}`;   
        } 
    })
}else{
    window.location.href = `login.html`;
}
