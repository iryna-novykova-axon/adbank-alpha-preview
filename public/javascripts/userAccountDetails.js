function editfirst(){
    
    document.getElementById('firstname').disabled=false; 
}

function editlast(){
    
    document.getElementById('lastname').disabled=false;  
}

function editphone(){
    
    document.getElementById('phone').disabled=false;  
}

function editaddress(){
    
    document.getElementById('address').disabled=false;  
}

function editbirth(){
    
    document.getElementById('birthday').disabled=false;  
}

function editgender(){
    
    document.getElementById('gender').disabled=false;  
}

function editcity(){
    
    document.getElementById('city').disabled=false;  
}

function editstate(){
    
    document.getElementById('state').disabled=false;  
}

function editzip(){
    
    document.getElementById('zip').disabled=false;  
}

function editcountry(){
    
    document.getElementById('country').disabled=false;  
}

function AdminuserAccountUpdate()
{
             
            var firstname=document.getElementById('firstname').value;  
            var lastname=document.getElementById('lastname').value;  
            var email=document.getElementById('email').value;  
            var phone=document.getElementById('phone').value;  
            var birthday=document.getElementById('birthday').value;  
            var address=document.getElementById('address').value;
            var city=document.getElementById('city').value;
            var state=document.getElementById('state').value;
            var zip=document.getElementById('zip').value;
            var country=document.getElementById('country').value;
            
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenadmin');
            axios.post('/api/accUpdateUser',{
                email:email, 
                firstname:firstname,
                lastname:lastname,
                phone:phone,
                birthday:birthday,
                address:address,
                city:city,
                state:state,
                zip:zip,
                country:country
             }).then(function(response){
                if(response)
                {
                    document.getElementById('firstname').disabled=true; 
                    document.getElementById('lastname').disabled=true; 
                    document.getElementById('phone').disabled=true;  
                    document.getElementById('address').disabled=true;  
                    document.getElementById('birthday').disabled=true;
                    document.getElementById('city').disabled=true; 
                    document.getElementById('state').disabled=true;  
                    document.getElementById('zip').disabled=true; 
                    document.getElementById('country').disabled=true; 
                }
             })
}