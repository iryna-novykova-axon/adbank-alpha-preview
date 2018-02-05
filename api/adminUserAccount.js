var db= require('../models/User.js')

usAcc= (req,res,next) => {
     
      db.user.findOneAndUpdate({email:req.body.email},{
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
     if(response.email==req.body.email)
     {
        res.send({message:'successfully updated yor profile' ,status:true})
     }
       }).catch(function (response){
           res.send({message:'failed to update'})
  })      

}
module.exports={
    usAcc
}