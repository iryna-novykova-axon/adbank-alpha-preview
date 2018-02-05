function reset(){

    toastr.info('Password Change in Progress','Please wait...',{
        timeOut             : 5000,
        extendedTimeOut     : 3000,
        closeButton         : true,
        progressBar         : true,
        tapToDismiss        : true,
     }); 
    var email=document.getElementById('em').innerHTML
    var password=document.getElementById('newPass').value
    var cnfPass=document.getElementById('cnfPass').value
    if(password==cnfPass){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenadmin');     
    axios.post('/api/chgPass',{
        email:email,
        password:password,
        cnfPass:cnfPass
    }).then(function(response){ 
        console.log(response)
       if(response.data.status==true)
          {
            toastr.clear();
            toastr.success('Password Change Completed','Please wait...',{
                timeOut             : 5000,
                extendedTimeOut     : 3000,
                closeButton         : true,
                progressBar         : true,
                tapToDismiss        : true,
                onHidden: function() {window.location.href = '/adminUserCamp';}
              }); 
          }
        else{
            
            toastr.clear();
            toastr.error('Password Change Failed','Please Try Again...',{
                timeOut             : 5000,
                extendedTimeOut     : 3000,
                closeButton         : true,
                progressBar         : true,
                tapToDismiss        : true,
                onHidden: function() {window.location.href = '/adminUserCamp';}
            })
        }
     })
   }
  else
    {
        toastr.clear();
        toastr.error('Password Do Not Match','Enter same Passwords...',{
            timeOut             : 5000,
            extendedTimeOut     : 3000,
            closeButton         : true,
            progressBar         : true,
            tapToDismiss        : true,
            onHidden: function() {window.location.href = '/adminUserCamp';}
        })
    }
}
function theme(){
	
		var dark= "/css/paper-dashboard.css"
		var light ="/css/paper-dashboard2.css"
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenadmin');
		axios.post('/api/admintheme',{
			dark:dark,
			light:light
		}).then(function(response){
			
			if(response.data.status==true)
			   location.reload();
		})
			 
	  }