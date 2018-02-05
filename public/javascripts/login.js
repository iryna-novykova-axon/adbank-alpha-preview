function login(){

    var email = document.getElementById('email').value
    var password= document.getElementById('password').value

  axios.post('/api/login',{
        email:email,
        password:password
    }).then(function(response){
        if(response.data.status=="incomplete")
         {
           
             if (typeof(Storage) !== "undefined") {
                 localStorage.setItem("tokenCOOMS", response.data.token);
	          }
            toastr.clear();
            toastr.info('Complete the Details','Please wait...',{
              timeOut             : 5000,
              extendedTimeOut     : 3000,
              closeButton         : true,
              progressBar         : true,
              tapToDismiss        : true,
              onHidden: function() {window.location.href = '/EnterFullInfo';}
            }); 
         
        }
        
        else if(response.data.status==true)
        {
           if (typeof(Storage) !== "undefined") {
                 localStorage.setItem("tokenCOOMS", response.data.token);
           }
           toastr.clear();
           toastr.success('Login Successfull','Please wait...',{
             timeOut             : 5000,
             extendedTimeOut     : 3000,
             closeButton         : true,
             progressBar         : true,
             tapToDismiss        : true,
             onHidden: function() {window.location.href = '/dashboard';}
           });
    
      }
      else if(response.data.status==false && response.data.us==true)
      {
        
         toastr.clear();
         toastr.error('Activation not completed','Please wait...',{
           timeOut             : 5000,
           extendedTimeOut     : 3000,
           closeButton         : true,
           progressBar         : true,
           tapToDismiss        : true,
           onHidden: function() {window.location.href = '/resend';}
         });
  
    }
    else if(response.data.status==false && response.data.us==false)
    {
      
       toastr.clear();
       toastr.error('Please Sign up','User Does not exist ...',{
         timeOut             : 5000,
         extendedTimeOut     : 3000,
         closeButton         : true,
         progressBar         : true,
         tapToDismiss        : true,
         onHidden: function() {window.location.href = '/';}
       });

  }
       else{
            toastr.clear();
            toastr.error('Login failed','Redirecting to login page...',{
              timeOut             : 5000,
              extendedTimeOut     : 3000,
              closeButton         : true,
              progressBar         : true,
              tapToDismiss        : true,
              onHidden: function() {window.location.href = '/';}
            });
            
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
 

  
 

