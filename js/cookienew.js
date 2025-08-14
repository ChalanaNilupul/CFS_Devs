


setTimeout(function(){
    
    let cookieAccepted=localStorage.getItem("cookieAccepted")

    if(cookieAccepted != "yes"){
        $(".cookie").addClass('active')
       
    }

   
    

},3000)

