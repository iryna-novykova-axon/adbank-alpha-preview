function fullComplete(){

    var firstname=document.getElementById('firstname').value;
    var lastname=document.getElementById('lastname').value 
    var country=document.getElementById('country').value
    var phone =document.getElementById('phone').value
    var birthday=document.getElementById('birthday').value
    var address=document.getElementById('address').value    
    var city=document.getElementById('city').value
    var state=document.getElementById('state').value 
    var zip=document.getElementById('zip').value  
    console.log(country)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenCOOMS');
    axios.post('/api/fullInfo',{
          firstname:firstname,
          lastname:lastname,
          country:country,
          phone:phone,
          birthday:birthday,
          address:address,
          city:city,
          state:state,
          zip:zip,
     }).then(function(response){
        console.log(response)  
        if(response.data.status==true)
           location.href='/dashboard'
        else
          location.href='/EnterFullInfo' 
     })
     
}