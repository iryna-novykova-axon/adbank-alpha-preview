var mongoose		=	require('mongoose');
var db	      	    =	require('../models/User');
var config			=	require('../config');
var axios				=	require('axios');
var jwt					= require('jsonwebtoken');
module.exports={


	adminsigninMethod: function(req, res){
        var adminemail=	req.body.adminemail;
		var adminpassword=	req.body.adminpassword;
        db.admin.findOne({email:adminemail,password:adminpassword}, function(err, user) {
             if (err) {
					return res.json({
						status	: 	false,
						message	: 	'Some error has been occured,Please try again later!',
					});
				}
				else if (!user) 
				{
					return res.json({
						status	: 	false,
						message	: 	'User not found, Please try with another one.',
					});
				} 
				else if (user) 
				{
						var token = jwt.sign({ id: user._id }, config.JWTSEC, {
						expiresIn: 86400 // expires in 24 hours
					});
					res.cookie('tokenadmin',[token,true]);
						return res.json({
							status	: 	true,
							message	: 	'Login Successfully.',
							token	: token,
						});
				}
			});
	}

}   