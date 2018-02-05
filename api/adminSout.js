var mongoose		=	require('mongoose');
var db	      	    =	require('../models/User');
var config			=	require('../config');
var axios				=	require('axios');
var jwt					= require('jsonwebtoken');
module.exports={

adminsignoutMethod: function(req,res){
   
    var token = jwt.sign({ id:'' }, config.JWTSEC, {
    });
    console.log("adminsignout",token)
    res.cookie('tokenadmin',['',false]);
    return res.json({
        status	:	true,
        message	:	'logout successfully.',
        token	:	token,
    });
  }
}  