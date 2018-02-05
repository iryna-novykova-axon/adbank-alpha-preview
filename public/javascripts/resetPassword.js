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