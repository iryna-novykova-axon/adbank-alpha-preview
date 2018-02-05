var db= require('../models/User.js')

info= (req,res,next) => {
     db.user.findOneAndUpdate({email:req.currentUser.email},{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        birthday:req.body.birthday,
        gender:req.body.gender,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        country:req.body.country           
   }).then(function(response){
        if(response.email==req.currentUser.email)
        {
            res.send({status:true, message:'successfully updated yor profile'})
        }
        }).catch(function (response){
            
            res.send({status:false, message:'failed to update'})
    })      
}

module.exports={
    info
}