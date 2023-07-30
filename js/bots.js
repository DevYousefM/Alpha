
getBots();
function getBots() {
  let bots = document.getElementById("bots");
  fetch("https://api.alphatrading0.com/api/bots", {
    method: 'GET'
    
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
    
      data.data.forEach(item=>{
            bots.innerHTML +=`
            <div class="box col-lg-12 col-sm-6" key="${item.bot}">
        <div class="heading">
           <div class="icon"><img src="../imges/forex ropot.png" alt="" srcset=""></div>
             <h2 class="title pt-2 my-auto"  >${item.bot}</h2>
           </div>
         <div class="bot-box">

             <h3 onClick="sendBotsid(${item.bot})">${item.bot}</h3>
             <div class="bo ">
                 <h3 style="direction: rtl;">${item.bot_period}</h3>
                 <h3>مدة صلاحية البوت</h3>
             </div>
             <div class="bo">
                 <h3>${item.profit_period}</h3>
                 <h3>سحب الارباح</h3>
             </div>
             <div class="bo moadal">
                 <h3> ${item.max_monthly_rate}$ <span><i class="fa-solid fa-left-long"></i></span> ${item.min_monthly_rate}$</h3>
                 <h3> معدل تنمية رأس المال الشهري</h3>
                
             </div>
             <div class="bo moadal">
                 <h3>${item.max_total_rate}$ <span><i class="fa-solid fa-left-long"></i></span> ${item.min_total_rate}$</h3>
                 <h3> معدل تنمية رأس المال الاجمالي</h3>
                 
              
             </div>
             <div class="bo moadal">
                 <h3> ${item.max_average}$<span >-</span> ${item.min_average}$</h3>
                 <h3> متوسط قيمة رأس المال المتداول</h3>
                 
             
             </div>
             <button class="btn-toactive" data_name="${item.bot}"  key=${item.id}> التفعيل الان</button>

         </div>
     </div>
            `
            let boxes = document.querySelectorAll(".btn-toactive");
            boxes.forEach(box=>{
              box.addEventListener("click",function () {
                let id = box.getAttribute("key")
                let botname = box.getAttribute("data_name")
                sendBotsid(id,botname);
              })
            })
      })
 
  })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error); 
      
    });
    
}
function sendBotsid(id,botname){
  if(botname==="CRYPTO BOT"){
    window.location.href = `./activate1.html?id=${id}`;
  }else if(botname==="FOREX BOT"){
    window.location.href = `./activate2.html?id=${id}`;
  }else if(botname==="OPTION BOT"){
    window.location.href = `./activate3.html?id=${id}`;
  }
}





