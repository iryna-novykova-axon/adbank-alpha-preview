var db= require('../models/User.js')

th= (req,res,next) => {
      dark=req.body.dark
      light=req.body.light
      var neth='';
      db.user.findOne({email:req.currentUser.email}).then(function(user){
      if(user)
        {   
            if(user.theme=="/css/paper-dashboard.css")
              {
                neth="/css/paper-dashboard2.css"
              }
            else
              {
                 neth="/css/paper-dashboard.css" 
              }  
        }
     }).then(function(response){
         
     db.user.update({email:req.currentUser.email},{$set:{theme:neth}}).then(function(err,response){
        res.send({status:true,message:'theme Updated'})
        })
     }).catch(function(err){
       
        res.send({status:false, message:'failed to update'})
    })      

}
module.exports={
    th
}