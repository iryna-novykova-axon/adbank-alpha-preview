var express                    =    require('express');
var router                     =    express.Router();
var jwt					       =	require('jsonwebtoken');
var mongoose			       =	require('mongoose');
var db			               =	require('../models/User');
var axios				       =	require('axios');
var config			           =	require('../config');


//user api check
var verifyToken=function(req,res,next){
   var authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
          if (token) {
           
            jwt.verify(token, config.JWTSECRET, function(err, decoded) {
               if (err)return res.send({ status: false, message: 'Failed to authenticate token.' });
                   db.user.findOne({_id: decoded.id}).then(function(res){
                        if(!res || res=='')return res.send({ status: false, message: 'User not found.'});
                        if(res){
                       
                            req.currentUser = res;
                            return next();
                        }
                    }).catch(function(err){
                        return res.send({ status: false, message: 'User not found OR Some error has been occured.'});
                    });
            });
        }else {
            return res.send({ status: false, message: 'No token provided.' });
        }
    }
    else {
        return res.send({ status: false, message: 'authorization Header is not set.' });
    }
};


//admin api check
var verifyTokenad=function(req,res,next){
  var authorizationHeader = req.headers['authorization'];
  if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
          if (token) {
           
          jwt.verify(token, config.JWTSEC, function(err, decoded) {
            if (err)return res.send({ status: false, message: 'Failed to authenticate token.' });
                   db.admin.findOne({_id: decoded.id}).then(function(res){
                      
                    if(!res || res=='')return res.send({ status: false, message: 'User not found.'});
                        if(res){
                       
                            req.currentUser = res;
                            return next();
                        }
                    }).catch(function(err){
                        return res.send({ status: false, message: 'User not found OR Some error has been occured.'});
                    });
            });
        }else {
            return res.send({ status: false, message: 'No  token provided.' });
        }
    }
    else {
        return res.send({ status: false, message: 'authorization Header is not set.' });
    }
};

//User's Apis

//Register
var register = require('../api/register.js');
router.post('/register',register.reg);
router.get('/activate/:token',register.verifyRegisterMethod);
router.post('/resVer',register.getEmailActivationLinkMethod);

//Sign iN 

var sign = require('../api/signIn.js');
router.post('/login',sign.signinMethod);

//sign out
var si = require('../api/siOut.js');
router.post('/logout',verifyToken,si.signoutMethod);

//Full Info
var fullInfo = require('../api/fullInfo.js');
router.post('/fullInfo',verifyToken,fullInfo.info);

//account update
var accountDetails = require('../api/userAccount.js');
router.post('/accDetails',verifyToken,accountDetails.account);

//Image Upload
var imgrq= require('../api/img.js');
router.post('/imgReq',verifyToken,imgrq.img);

//image or campaign update
var imgUp= require('../api/imgUp.js');
router.post('/imgUpdate',verifyToken,imgUp.imga);

//theme change api
var them= require('../api/them.js');
router.post('/theme',verifyToken,them.th);

//admin Apis

var signAdmin = require('../api/signAdmin.js');
router.post('/adminLogin',signAdmin.adminsigninMethod);

var campUp= require('../api/userCampUp.js');
router.post('/adminCampUp',verifyTokenad,campUp.campup);

var adminSout = require('../api/adminSout.js');
router.post('/adminout',verifyTokenad,adminSout.adminsignoutMethod);


//user Account Update
var adminUser = require('../api/adminUserAccount.js');
router.post('/accUpdateUser',verifyTokenad,adminUser.usAcc);

var adAc = require('../api/adAc.js');
router.post('/adDetails',verifyTokenad,adAc.acc);

var changePass = require('../api/changePass.js');
router.post('/chgPass',verifyTokenad,changePass.ch);

var adminthem= require('../api/adminthem.js');
router.post('/admintheme',verifyTokenad,adminthem.the);

module.exports = router;
