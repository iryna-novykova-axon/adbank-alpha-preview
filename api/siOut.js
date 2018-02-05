var mongoose		=	require('mongoose');
var db	      	    =	require('../models/User');
var config			=	require('../config');
var axios				=	require('axios');
var jwt					= require('jsonwebtoken');
module.exports={

signoutMethod: function(req,res){
    var token = jwt.sign({ id:'' }, config.JWTSECRET, {
    });
    //console.log('signoutMethod',token);
    res.cookie('tokenCOOMS',['',false]);
    return res.json({
        status	:	true,
        message	:	'logout successfully.',
        token	:	token,
    });
  }
}