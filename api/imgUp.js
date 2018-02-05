var db= require('../models/User.js')

imga= (req,res,next) => {
  
    let data = {
        status:req.body.status,
        name:req.body.name,
        email:req.currentUser.email,
        link:req.body.link,
        totalTokenSpend:req.body.totalTokenSpend,
    }
    if(req.body.MediumRec) {
        data.MediumRec = req.body.MediumRec
    }    if(req.body.LargeRec) {
        data.LargeRec = req.body.LargeRec
    }    if(req.body.leaderboard) {
        data.leaderboard = req.body.leaderboard
    }    if(req.body.halfpage) {
        data.halfpage= req.body.halfpage
    }    if(req.body.largeImage) {
        data.largeImage = req.body.largeImage
    }
      db.adReq.findOneAndUpdate({_id:req.body.ide},data).then(function(response){
   
       res.send({message:"success"})
      
 }).catch(function (response){
    console.log(response)        
    res.send({message:'failed'})
    })      

}

module.exports={
 imga
}