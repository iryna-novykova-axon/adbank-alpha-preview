function resend(){
    
    var x = document.getElementById("email").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(!re.test(x)){
        alert('Not a valid mail')
        location.reload('/Signup') 
     }
    else{
    toastr.success("Registeration in process",'Please Wait...',{
        timeOut             : 5000,
        extendedTimeOut     : 3000,
        closeButton         : true,
        progressBar         : true,
        tapToDismiss        : true,
    }); 
    var email = document.getElementById('email').value
    axios.post('/api/resVer',{
            email:email,
        }).then(function(response){
            if(response.data.status==true){
                toastr.clear();
                toastr.info(`${response.data.message}`,'Check Your MailBox...',{
                  timeOut             : 5000,
                  extendedTimeOut     : 3000,
                  closeButton         : true,
                  progressBar         : true,
                  tapToDismiss        : true,
                  onHidden: function() {window.location.href = '/';}
                }); 
               return false
               } 
             else
              {
             
               toastr.error(`${response.data.message}`,'Try Again...',{
                 timeOut             : 5000,
                 extendedTimeOut     : 3000,
                 closeButton         : true,
                 progressBar         : true,
                 tapToDismiss        : true,
                 onHidden: function() {window.location.href = '/resend';}
               }); 
              return false
             } 
          })
      }
      function theme(){
        var x= localStorage.getItem("theme")
          if(x=="dark")
          {
            document.getElementById('dark').href="/css/paper-dashboard2.css";
            localStorage.setItem("theme", '');
        
            
          }
          else
          {
          document.getElementById('dark').href="/css/paper-dashboard.css";
          localStorage.setItem("theme", 'dark');
         
          
          }
      }
      var x= localStorage.getItem("theme")
      if(x=="dark")
      {
        document.getElementById('dark').href="/css/paper-dashboard.css";
       
    
      }
      else
      {
        document.getElementById('dark').href="/css/paper-dashboard2.css";
     
      }