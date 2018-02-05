var mongoose		=	require('mongoose');
var db	      	    =	require('../models/User');
var config			=	require('../config');
var axios				=	require('axios');
var jwt					= require('jsonwebtoken');
module.exports={

	signinMethod: function(req, res){
        var email=	req.body.email;
		var password=	req.body.password;
	    db.user.findOne({email: email,password:password}, function(err, user) {
           if (err) {
					return res.json({
						status	: 	false,
						message	: 	'Some error has been occured,Please try again later!',
					});
				}
				else if (!user) {
					return res.json({
						us      :   false,
						status	: 	false,
						message	: 	'No Such user!',
					});
				}
                 
				else if (user.status==false) 
				{
					return res.json({
						us      : true,
						status	: 	false,
						message	: 	'User not activated',
					});
				}
                else if (user.country==null||user.firstname==null||user.lastname==null||user.phone==null||user.birthday==null||user.state==null||user.city==null||user.zip==null) 
				{
					var token = jwt.sign({ id: user._id }, config.JWTSECRET, {
						expiresIn: 86400 // expires in 24 hours
						});
						res.cookie('tokenCOOMS',[token,true]);
							return res.json({
								status	: 	"incomplete",
								message	: 	'Login Successfully.',
								token	:     token,
								user    :    user._id
							});
				
				} 
 
				else if (user.status==true) 
				{
			            var token = jwt.sign({ id: user._id }, config.JWTSECRET, {
						expiresIn: 86400 // expires in 24 hours
						});
						console.log("token",token)
						res.cookie('tokenCOOMS',[token,true]);
							return res.json({
								status	: 	true,
								message	: 	'Login Successfully.',
								token	: token,
							});
				}
				
			});
	}

}   