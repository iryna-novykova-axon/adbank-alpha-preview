function adminLogin(){
    
    var adminemail = document.getElementById('adminemail').value
    var adminpassword=document.getElementById('adminpassword').value
   
    axios.post('/api/adminLogin',{
        adminemail:adminemail,
        adminpassword:adminpassword
    }).then(function(response){
        if(response.data.status==true)
        {
         
            if (typeof(Storage) !== "undefined") {
                
                localStorage.setItem("tokenadmin", response.data.token);
                
            }
            toastr.clear();
            toastr.success('Login Successfull','Please wait...',{
              timeOut             : 3000,
              extendedTimeOut     : 1000,
              closeButton         : true,
              progressBar         : true,
              tapToDismiss        : true,
              onHidden: function() {window.location.href = '/adminUserCamp';}
            }); 
         }
       else{
        toastr.clear();
        toastr.error('Password or ID Mismatch','Please try again...',{
          timeOut             : 3000,
          extendedTimeOut     : 1000,
          closeButton         : true,
          progressBar         : true,
          tapToDismiss        : true,
          onHidden: function() {window.location.href = '/admin';}
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