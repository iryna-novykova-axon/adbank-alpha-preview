function adminLogout(){
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenadmin');
	axios.post('/api/adminout').then(function(response){
	
		if(response.data.status)
		{
			axios.defaults.headers.common['Authorization'] = '';
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("tokenadmin", '');
			}
			toastr.clear();
            toastr.success('Logout Successfull','Logging off...',{
              timeOut             : 3000,
              extendedTimeOut     : 1000,
              closeButton         : true,
              progressBar         : true,
              tapToDismiss        : true,
              onHidden: function() {window.location.href = '/admin';}
            });

		}
		else{
			axios.defaults.headers.common['Authorization'] = '';
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("tokenadmin", '');
			}
			toastr.clear();
            toastr.success('Logout Successfull','Logging off...',{
              timeOut             : 3000,
              extendedTimeOut     : 1000,
              closeButton         : true,
              progressBar         : true,
              tapToDismiss        : true,
              onHidden: function() {window.location.href = '/admin';}
            });
		
		}
	}).catch(function(err){
			axios.defaults.headers.common['Authorization'] = '';
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("tokenadmin", '');
			}
			toastr.clear();
            toastr.success('Logout Successfull','Logging off...',{
              timeOut             : 3000,
              extendedTimeOut     : 1000,
              closeButton         : true,
              progressBar         : true,
              tapToDismiss        : true,
              onHidden: function() {window.location.href = '/admin';}
            });
	});
}

function searchToggle(obj, evt){
	var container = $(obj).closest('.search-wrapper');

	if(!container.hasClass('active')){
		  container.addClass('active');
		  evt.preventDefault();
	}
	else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
		  container.removeClass('active');
		  // clear input
		  container.find('.search-input').val('');
		  // clear and hide result container when we press close
		  container.find('.result-container').fadeOut(100, function(){$(this).empty();});
	}
}

function submitFn(obj, evt){
	value = $(obj).find('.search-input').val().trim();

	_html = "Yup yup! Your search text sounds like this: ";
	if(!value.length){
		_html = "Yup yup! Add some text friend :D";
	}
	else{
		_html += "<b>" + value + "</b>";
	}

	$(obj).find('.result-container').html('<span>' + _html + '</span>');
	$(obj).find('.result-container').fadeIn(100);

	evt.preventDefault();
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
