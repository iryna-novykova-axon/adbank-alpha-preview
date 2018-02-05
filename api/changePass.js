var db= require('../models/User.js')

ch= (req,res,next) => {
      email=req.body.email
      password=req.body.password
      cnfPass=req.body.cnfPass
     db.user.find({email:email}).then(function(user){
        if(user)
        {
            db.user.update({email:req.body.email},{$set:{password:cnfPass}}).then(function(err,response){
            })
            res.send({status:true,message:'Updated Password'})
        }
       }).catch(function(err){
        console.log(err)
        res.send({status:false, message:'failed to update'})
  })      

}
module.exports={
    ch
}