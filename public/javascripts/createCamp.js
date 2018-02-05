var LargeRec='';
var MediumRec='';
var leaderboard='';
var halfpage='';
var largeImage='';
var cut= '';
var email='';
var name ='';


function readURL(input){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0]);
    
    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        LargeRec = e.target.result;
        image.onload = function (){
           if(this.width<=330&&this.height<=280){
                LargeRec = e.target.result;
              
            }
            else
            alert('width and height should be of 330*280')
        }
    };
}
function readURL1(input){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0]);
    
    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function (){
     
            if(this.width<=300&&this.height<=250){
                MediumRec= e.target.result;
          
            }
            else
            alert('width and height should be of 330*250') 
        }
    };
}
function readURL2(input){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0]);
    
    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        leaderboard = e.target.result;
          image.onload = function (){
          if(this.width<=720&&this.height<=90){
                halfpage = e.target.result;
                
            }
            else
            alert('width and height should be of 720*90') 
        }
    };
}
function readURL3(input){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0]);
    
    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        
        image.onload = function (){
          if(this.width<=300&&this.height<=600){
                halfpage = e.target.result;
          
            }
            else
            alert('width and height should be of 300*600') 
        }
    };
}
function readURL4(input){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0]);
    
    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
      
        image.onload = function (){
          if(this.width<=320&&this.height<=100){
                largeImage = e.target.result;
             
            }
            else
            alert('width and height should be of 320*100') 
            
        }
    };
}

function submit(){
    
    var status=document.getElementById('switch-flat').checked
    console.log("status",status)
    if(status==true)
     {
         status="enabled"  
     }
    else
      status="disabled" 
    var name= document.getElementById('name').value
    var totalTokenSpend=document.getElementById('totalTokenSpend').value
    var link=document.getElementById('link').value
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenCOOMS'); 
    axios.post('/api/imgReq',{
        status:status,
        name:name,
        totalTokenSpend:totalTokenSpend,
        LargeRec:LargeRec,
        MediumRec:MediumRec,
        leaderboard:leaderboard,
        halfpage:halfpage,
        largeImage:largeImage,
        link:link
}).then(function(response){
    location.href='/createCampaign'
    console.log(response)
 })
}

// $('.cutToken').on('click',function(){
//      cut= $(this).attr("data-id")
//     console.log('cut',cut)
//     document.getElementById('cutTok').value=cut
//      email= document.getElementById('ema').innerHTML
//      name= document.getElementById('nm').innerHTML
//     console.log('hjv',email)
//     console.log(name)
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenCOOMS');
  

// })
function chh(){
    if(document.getElementById('switch-flat').checked==false)
    {   
        document.getElementById('switch-flat').checked=true;
        document.getElementById('endis').innerHTML="Enabled";
        // document.getElementById('name').disabled=true; 
        // document.getElementById('totalTokenSpend').disabled=true;
        // document.getElementById('link').disabled=true;
        // document.getElementById('largeRec').disabled=true;
        // document.getElementById('MediumRec').disabled=true;
        // document.getElementById('leaderboard').disabled=true;
        // document.getElementById('halfPage').disabled=true;
        // document.getElementById('LargeImage').disabled=true;
        // document.getElementById('sub').disabled=true;
        
      }  
    }



function ch(){
if(document.getElementById('switch-flat').checked==false)
{
    // document.getElementById('name').disabled=true; 
    // document.getElementById('totalTokenSpend').disabled=true;
    // document.getElementById('link').disabled=true;
    // document.getElementById('largeRec').disabled=true;
    // document.getElementById('MediumRec').disabled=true;
    // document.getElementById('leaderboard').disabled=true;
    // document.getElementById('halfPage').disabled=true;
    // document.getElementById('LargeImage').disabled=true;
    // document.getElementById('sub').disabled=true;
    document.getElementById('endis').innerHTML="Disabled";
  }  
else
{
    // document.getElementById('name').disabled=false; 
    // document.getElementById('totalTokenSpend').disabled=false;
    // document.getElementById('link').disabled=false;
    // document.getElementById('largeRec').disabled=false;
    // document.getElementById('MediumRec').disabled=false;
    // document.getElementById('leaderboard').disabled=false;
    // document.getElementById('halfPage').disabled=false;
    // document.getElementById('LargeImage').disabled=false;
    // document.getElementById('sub').disabled=false;
    document.getElementById('endis').innerHTML="Enabled";
  }
}