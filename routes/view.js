var express = require('express');
var router      = express.Router();
var jwt				  =	require('jsonwebtoken');
var config			=	require('../config');
var mongoose		=	require('mongoose');
var db		      =	require('../models/User');
var axios			  =	require('axios');
user= (req,res,next) => {
       
    db.user.find({}).then(function(response){
     if(response)
     {
       var users=response   
   
      }
    }).catch(function (response){
           
    })
}
module.exports=user         

var verifyToken=function(req,res,next){

  if(req.cookies.tokenCOOMS){
    token 		= req.cookies.tokenCOOMS[0];
    tokenStatus	=req.cookies.tokenCOOMS[1];
    if (tokenStatus && token && token!=undefined) {
      if (!token)return res.redirect('/');
      jwt.verify(token, config.JWTSECRET, function(err, decoded) {
        if (err)return res.redirect('/');
          db.user.findOne({_id: decoded.id}).then(function(res){
            if(res==null || res=='')return res.redirect('/');
            if(res){
         
              req.currentUser = res;
              return next();
            }
          }).catch(function(err){
            return res.redirect('/');
          });
      });
    }
    else {
      return res.redirect('/');
    }
  }else {
    return res.redirect('/');
  }
};


//admin token verification

var verifyTokenadmin=function(req,res,next){
 
  if(req.cookies.tokenadmin){
    token 		= req.cookies.tokenadmin[0];
    tokenStatus	=req.cookies.tokenadmin[1];
    if (tokenStatus && token && token!=undefined) {
      if (!token)return res.redirect('/admin');
      jwt.verify(token, config.JWTSEC, function(err, decoded) {
        if (err)return res.redirect('/admin');
          db.admin.findOne({_id: decoded.id}).then(function(res){
            if(res==null || res=='')return res.redirect('/admin');
            if(res){
         
              req.currentAdmin = res;
              return next();
            }
             
          }).catch(function(err){
            return res.redirect('/admin');
          });
      });
    }
    else {
      return res.redirect('/admin');
    }
  }else {
    return res.redirect('/admin');
  }
};
var ifNotLogin=function(req,res,next)
{  if(req.cookies.tokenCOOMS && req.cookies.tokenCOOMS[0] && req.cookies.tokenCOOMS[1])
        {    
          return res.redirect('/dashboard');  
        }else 
        {    
          return next();  
        }
};
var adminifNotLogin=function(req,res,next)
{  if(req.cookies.tokenadmin && req.cookies.tokenadmin[0] && req.cookies.tokenadmin[1])
        {    
          return res.redirect('/adminUserCamp');  
        }else 
        {    
          return next();  
        }
};

router.get('/resend',ifNotLogin, function(req, res, next) {
  res.render('resendVerification', { title: 'AdBank' });
});

router.get('/comm',ifNotLogin, function(req, res, next) {
  res.render('common', { title: 'AdBank' });
});

/* GET home page. */
//login
router.get('/',ifNotLogin, function(req, res, next) {
  res.render('login', { title: 'AdBank' });
});

//signup
router.get('/Signup', function(req, res, next) {
  res.render('Signup', { title: 'AdBank' });
});

//enter full info
router.get('/EnterFullInfo',verifyToken, function(req, res, next) {
  
   res.render('EnterFullInfo', { title: 'AdBank',user:req.currentUser.email,theme:req.currentUser.theme});
});

//enter dashboard
router.get('/dashboard',verifyToken, function(req, res, next) {
  db.adReq.find({email:req.currentUser.email}).then(function(response){
    if(response)
    {
      var camp=response 
      var cmp=response.length; 
      console.log(cmp)
      res.render('dashboard', {title: 'View Edit',user:req.currentUser,camps:camp,cmp:cmp,theme:req.currentUser.theme});
    }
   }).catch(function (response){
          
   })
 
});
  
//enter campaign
router.get('/createCampaign',verifyToken, function(req, res, next) {
  db.adReq.find({email:req.currentUser.email}).then(function(response){
    if(response)
    {
      
      var cmp=response.length; 
      console.log(cmp)
      
  res.render('createCampaign', {title: 'View Edit',user:req.currentUser,cmp:cmp,theme:req.currentUser.theme});
    }
   }).catch(function (response){
          
   })
  
})

//enter addTokens
router.get('/addTokens',verifyToken, function(req, res, next) {
  db.adReq.find({email:req.currentUser.email}).then(function(response){
    if(response)
    {
      
      var cmp=response.length; 
      console.log(cmp)
      
      res.render('addtokens', {title: 'View Edit',user:req.currentUser,cmp:cmp,theme:req.currentUser.theme});
    }
   }).catch(function (response){
          
   })
 
})  

//enter accountdetails
router.get('/accountDetails',verifyToken, function(req, res, next) {
  db.adReq.find({email:req.currentUser.email}).then(function(response){
    if(response)
    {
      
      var cmp=response.length; 
      console.log(cmp)
      
      res.render('accountdetails', {title: 'View Edit',user:req.currentUser,cmp:cmp,theme:req.currentUser.theme});
    }
   }).catch(function (response){
          
   })
 
})  

//editCampaign

router.get('/campaignEdit/:id',verifyToken, function(req, res, next) {
  db.adReq.find({_id:req.params.id}).then(function(response){
   
    if(response)
    {
       var camp=response[0]
       res.render('userCampEdit', {title: 'View Edit',user:req.currentUser,camps:camp,theme:req.currentUser.theme});
    }
   }).catch(function (response){
          
   })
 
})

//admin

//admin login
router.get('/admin',adminifNotLogin, function(req, res, next) {
  res.render('adminLogin', { title: 'AdBank' });
});

router.get('/adminUserCamp',verifyTokenadmin,function(req, res, next) {
  db.user.find({}).then(function(response){
   
    if(response)
    {
       var user=response;       
     
       res.render('adminusersCampaigns', {title: 'View Edit',admin:req.currentAdmin,user:user,theme:req.currentAdmin.theme});
    }
   }).catch(function (response){
          
   })
  

});

//campaigns link
router.get('/campaigns/:email',verifyTokenadmin, function(req, res, next) {
  db.adReq.find({email:req.params.email}).then(function(response){
 
    if(response)
    {
      var camp=response 
        res.render('UserCampaigns', {camps:camp ,em:req.params.email,theme:req.currentAdmin.theme});
     }
   }).catch(function (response){
          
   })
})

//admin user camp edit
router.get('/campEdit/:id',verifyTokenadmin, function(req, res, next) {
  db.adReq.find({_id:req.params.id}).then(function(response){
 
    if(response)
    {
      var camp=response[0] 
        res.render('adminCampaignEdit', {camps:camp,theme:req.currentAdmin.theme});
     }
   }).catch(function (response){
          
   })
})

//admin user details
router.get('/userDetails/:email',verifyTokenadmin, function(req, res, next) {
  db.user.find({email:req.params.email}).then(function(response){
 
    if(response)
    {
      var user=response[0] 
      res.render('userAccountDetails', {user:user,theme:req.currentAdmin.theme});
     }
   }).catch(function (response){
          
   })
})

//admin acc details
router.get('/adminAccountDetails',verifyTokenadmin, function(req, res, next) {
  res.render('adminAccountDetails', { title: 'AdBank' ,admin:req.currentAdmin,theme:req.currentAdmin.theme});
});

//reset password

router.get('/resPass/:email',verifyTokenadmin, function(req, res, next) {
  res.render('resetPassword', { title: 'AdBank' ,admin:req.currentAdmin,email:req.params.email,theme:req.currentAdmin.theme});
});

//password change
router.get('/mailRen/:email',verifyTokenadmin, function(req, res, next) {
  res.render('mailRender', { title: 'AdBank' ,admin:req.currentAdmin,email:req.params.email,theme:req.currentAdmin.theme});
});

module.exports = router;
