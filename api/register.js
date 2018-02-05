var db = require('../models/User.js')
var mongoose = require('mongoose');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var config			=	require('../config');



  reg = (req, res, next) => {
   
       var randomValue = randomstring.generate({
        charset: '8008008'

    });

    var emailerToken = req.body.email + randomValue;
    var linkExpires = Date.now() + 86400000; //24 Hours

    db.user.find({ email: req.body.email }).then(function (response) {
        if (response == '') {
            var newData = new db.user({
                email           :   req.body.email,
                password        :   req.body.password,
                emailerToken	:	emailerToken,
                linkExpires		:	linkExpires,
                status          :   false
          });
            newData.save().then(function (response) {
                if (response._id == ''){
                    res.send({ status: 'Database failed to save -possibilities- duplicacy of email id' })
                }
                else
                   {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'noreplytestmailservices@gmail.com',
                            pass: 'timus1993'
                        }
                    });

                    var mailOptions = {
                        from:	'noreplytestmailservices@gmail.com',
                        to:		req.body.email,
                        subject:'AdBank Account Activation',
                        html:	'You are receiving this because you have signed up to the AdBank using your mail ID('+req.body.email+').<br>' +
                                'Please click on the following link, to complete the activation process: ' +
                                '<a href="'+config.emailerPreText+'/api/activate/' + emailerToken + '">Click here</a> to activate<br>' +
                                '<b style="color:#00FF00">link will expire after 24 Hours form now</b>'+'<br>'+
                                'If you did not sign up to the AdBank, please ignore this email and your email will not be used for Signup.<br>'+
                                '<b style="color:#FF0000">If you forgot to verify your account,Then you can resend the verification link after 24 Hours form now</b><br>'
                    };

                    transporter.sendMail(mailOptions, function(error, mailsent){
                        if (error) {
                            console.log(error)    
                            return res.send({
                                    status	: false,
                                    message	: 'Registration could not procced at this time, Please try again later!',
                                });
                        } else {
                                return res.json({
                                    status	: 	true,
                                    message	: 	'An Email will be sent to you shortly. Please visit your mailbox and activate the account. Activation link is valid for 24 Hours',
                                    emailerToken: emailerToken
                                });
                        }
                    });

                   }
            })

        }
        else {
            res.send({ message: 'User ID already exist' })
        }

    }).catch(function (response) {

        res.send({ status: 'faliure' })
    })

}

verifyRegisterMethod= (req, res,next) =>{
   var Token	=	req.params.token;
	if(Token){
		db.user.findOne({emailerToken: Token}, function (err, user) {
			if(user){
				if(user.linkExpires < Date.now() || user.linkExpires ==null ||user.linkExpires==''){
					
                     return res.render('common', { title: 'Email Verification', heading: 'Activation link  expired', message:'Please follow activation proccess again!', linkHref: 'http://localhost:5000/Signup', linkText: 'Go To SignUp Page' });
                }
				else{
					user.status			=	true;
					user.linkExpires	=	null;
					user.emailerToken	=	null;
					user.save(function (err,saved) {
						if(err) {
                            return res.render('common', { title: 'Email Verification', heading: 'Some Error Occured',message:'Please follow activation proccess again!', linkHref: 'http://localhost:5000/SignUp', linkText: 'Go To SignUp Page' });
						}
                        return res.render('common', { title: 'Email Verification', heading: 'Activation Successful!',message :'Your Account has beeen Activated!', linkHref: 'http://localhost:5000', linkText: 'Go To login Page' });
					});
				}
			}
			else{
                return res.render('common', { title: 'Email Verification', heading: 'Invalid Link!',message:'This is not a valid link please try with a valid link!', linkHref: 'http://localhost:5000/Signup', linkText: 'Go To SignUp Page' });
			}

		});
		//return res.send(`Activated: ${req.params.token}`);
	}
	else{
        return res.render('common', { title: 'Email Verification', heading: 'Link not Correct!!',message:'Please Try Again', linkHref: 'http://localhost:5000/Signup', linkText: 'Go To Signup Page' });
	}
}




getEmailActivationLinkMethod= (req, res,next) =>{
    var email 					=	req.body.email;
    var randomValue				=	randomstring.generate(32);
    var emailerToken			=	email+randomValue;
    var linkExpires				=	Date.now() + 86400000; //24 Hours
    if(!email && email=='' && email == undefined)return res.send({ status: false, message: 'This account is not exists!'});
    db.user.findOne({email:email}, function(err,user){
        if(err)return res.send({ status: false, message: 'Internal Server Error. Please try again later.'});
        if(!user)return res.send({ status: false, message: 'This account is not exists,Please complete the registration proccess.'});
        if(user.linkExpires>Date.now())return res.send({ status: false, message: 'Verifiction link already sent to you, Please visit your mailbox and activate the account!'});
            user.linkExpires	=	linkExpires;
            user.emailerToken	=	emailerToken;
            user.save(function (err,saved) {
                if(err)return res.send({ status: false, message: 'Internal Server Error. Please try again later.'});
                if(!saved)return res.send({ status: false, message: 'Internal Server Error. Please try again later.'});
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'noreplytestmailservices@gmail.com',
                            pass: 'timus1993'
                        }
                    });
                    var mailOptions = {
                        from:	'noreplytestmailservices@gmail.com',
                        to:		email,
                        subject:req.body.email,
                        html:	'You are receiving this because you have signed up to the AdBank using your mail ID('+req.body.email+').<br>' +
                                'Please click on the following link, to complete the activation process: ' +
                                '<a href="'+config.emailerPreText+'/api/activate/' + emailerToken + '">Click here</a> to activate<br>' +
                                '<b style="color:#00FF00">link will expire after 24 Hours form now</b>'+'<br>'+
                                'If you did not sign up to the AdBank, please ignore this email and your email will not be used for Signup.<br>'+
                                '<b style="color:#FF0000">If you forgot to verify your account,Then you can resend the verification link after 24 Hours form now</b><br>'
                    };
                    transporter.sendMail(mailOptions, function(error, mailsent){
                        if (error)return res.send({ status: false, message: 'Internal Server Error while sending mail. Please try again later.'});
                        if(!mailsent)return res.send({ status: false, message: 'Could not send actiavtion link at this time. Please try again later.'});
                        return res.send({ status: true, message: 'An Activation link will be sent to you shortly,Activation link is valid for 24 Hours'});

                    });
            });
    });
}

module.exports={
    reg,
    verifyRegisterMethod,
    getEmailActivationLinkMethod
}