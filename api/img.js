var db= require('../models/User.js')
var cm=''
img= (req,res,next) => {
   db.adReq.find({ email:req.currentUser.email}).then(function(response){
    if(response)
      {
       cm=response.length
       cm=cm+1;
    
      }
    }).then(function(response){
            db.user.findOne({ email:req.currentUser.email},function(err,user) {
            user.campaigns = cm
            user.save()
        })
     })
 
 db.adReq.find({}).then(function(response){
      if(response)
     {
       var newData = new db.adReq({
            status:req.body.status,
            name:req.body.name,
            email:req.currentUser.email,
            LargeRec:req.body.LargeRec,
            MediumRec:req.body.MediumRec,
            leaderboard:req.body.leaderboard,
            halfpage:req.body.halfpage,
            largeImage:req.body.largeImage,
            totalTokenSpend:req.body.totalTokenSpend,
            link:req.body.link
      });
        newData.save().then(function (response) {
          res.send({message:"success",status:true,id:response._id})
        })
      }
    }).catch(function (response){
           res.send({message:'failed'})
    })      
}

module.exports={
 img
}