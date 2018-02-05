var express				=	require('express');
var router				=	express.Router();
var Route 				=	express.Route; 
var userModel			=	require('../models/User');
 var mongoose			=	require('mongoose'); 
 mongoose.Promise	=	require('bluebird');
  var http				=	require('http')
  var chai				=	require('chai');
  var chaiHttp		=	require('chai-http');
  var app				 	=	require('../app');
  var should			=	require('chai').should();
 var db= require('../models/User.js')
  var expect			=	chai.expect;
  chai.use(chaiHttp);
  var axios= require('axios')
  var token=''
  var admintoken=''
  var adIde=''
  var userIde=''
  describe('Users Api Testing', () => 
     {	
     
      
    it('Register api', function(done) {
           
           this.timeout(15000)
           var body = {		  
             email: "samplesam@gmail.com",		  
             password: "123456"	  
            }	  
             chai.request(app)		  
             .post('/api/register')		  
             .send(body)		  
             .end((err, res) => {	
               token=res.body.emailerToken
               res.body.should.have.status(true);			  
               res.body.should.be.a('object');			  
             	 done();	  
                		  
         
              })	
          });
            
    it('Verification api', function(done) {
      
      this.timeout(15000)
    	   chai.request(app)		  
        .get(`/api/activate/${token}`)		  
      	.end((err, res) => {	
       		 res.body.should.be.a('object');			  
           done();	  
        })	
     }); 
  
      it('Login api', 
        (done) => 
            {	  
              var body = {		  
                 email: "samplesam@gmail.com",		  
                 password: "123456"	  
                }	  
                 chai.request(app)		  
                 .post('/api/login')		  
                 .send(body)		  
                 .end((err, res) => {	
                   userIde=res.body.user
                   token=res.body.token	  
                   res.should.have.status(200);			  
                   res.body.should.be.a('object');			  
                   res.body.should.have.status('incomplete');			  
            		 	 done();		  
             
                  });	
              });
        it('Full Info api', 
           (done) => 
               {	  
                   var body = {		  
                    email    :'samplesam@gmail.com',
                    firstname: 'sample',
                    lastname : 'samp',
                    phone    : '8882832737',
                    birthday : '23-3-1990',
                    gender   : 'sample',
                    address  : 'sdsd7732bbhb',
                    city     : 'sampu',
                    state    : 'sampstate',
                    zip      : '33323232323232' ,
                    country  : 'sampcountry'	  
                    }	  
            
                    chai.request(app)		  
                     .post('/api/fullInfo')
                     .set({'Authorization':'Bearer ' + token})			  
                     .send(body)		  
                     .end((err, res) => {			  
                    
                       res.should.have.status(200);			  
                       res.body.should.be.a('object');			  
                       res.body.should.have.status(true);			  
                       done();		  
                    
                      });	
                });
        
          it('Image Request', 
              (done) => 
                { 	  
                  var body = {		  
                     name:'navneet',
                     totalTokenSpend:0,
                     LargeRec:'sample',
                     MediumRec:'sample',
                     leaderboard:'sample',
                     halfpage:'sample',
                     largeImage:'sample',
                     link:'sample',
                     email: 'samplesam@gmail.com' 
                 }	  
                                
                     chai.request(app)		  
                     .post('/api/imgReq')
                     .set({'Authorization':'Bearer ' + token})		  
                     .send(body)		  
                     .end((err, res) => {			  
                           adIde=res.body.id
                           res.body.should.be.a('object');			  
                           res.body.should.have.status(true);			  
                           done();		  
                          });	
                  });                         
         
          it('Account Details update', 
             (done) => 
                 { 	  
                   var body = {		  
                   email: 'samplesam@gmail.com',                                        
                   firstname:'sample',
                   lastname:  'samp',
                   phone:     '32323232323',
                   birthday:  '23-3-1990',
                   gender:    'male',
                   address:   'ssada23e23',
                   city:       'xxxx',
                   state:        'xxxx',
                   zip:        23,
                   country:    'sdsdsd'   
                }	  
                                               
                   chai.request(app)		  
                   .post('/api/accDetails')
                   .set({'Authorization':'Bearer ' + token})		  
                   .send(body)		  
                   .end((err, res) => {			  
                    res.body.should.be.a('object');			  
                    res.body.should.have.status(true);			  
                    done();		  
                });	
            });                         
                   
                  it('Sign Out api test', 
                     (done) => 
                       { 	  
                         chai.request(app)		  
                         .post('/api/logout')
                         .set({'Authorization':'Bearer ' + token})		  
                         .end((err, res) => {			  
                                res.body.should.be.a('object');			  
                                res.body.should.have.status(true);			  
                                done();		  
                       });	
                    });                         
      });  

     

      //Admin Test Api


      describe('Admin Api Testing', () => 
      {	
         it('Admin Login api', 
         (done) => 
             {	  
               var body = {		  
                  adminemail: "admin1.7@gmail.com",		  
                  adminpassword: "123456"	  
                 }	  
                  chai.request(app)		  
                  .post('/api/adminLogin')
                  		  
                  .send(body)		  
                  .end((err, res) => {	
                  admintoken=res.body.token	  
                  res.body.should.have.status(true);			  
                  res.body.should.be.a('object');			  
             			done();		  
                  });	
               });
        it('Admin acoount update api', 
         (done) => 
            {	  
              var body = {		  
                email    :"admin1.7@gmail.com",
                firstname:"sample",
                lastname :"sample",
                phone    : 99232932992392 ,
                birthday : "23-2-13",
                address  : "sdseedededede",
                city     : "dadsd",
                state    : "sdsdsd",
                zip      : 323232,
                country  : "ssddsdsd" 
              }	  
              chai.request(app)		  
              .post('/api/adDetails')	
              .set({'Authorization':'Bearer ' + admintoken})	  
              .send(body)		  
              .end((err, res) => {	
                   res.body.should.have.status(true);			  
                   res.body.should.be.a('object');			  
                   done();		  
                  });	
           });                       
                       
            it('Admin User Account Update', function(done) {
              
                 var body={
                  email    :"samplesam@gmail.com",
                  firstname:"adminchange",
                  lastname :"samplechange",
                  phone    : 342432323,
                  birthday :"23-7-1998",
                  gender   :"adminupdate",
                  address  :"adminupdateaddress",
                  city     :"adminupdatecity",
                  state    :"adminupdatestate",
                  zip      :232323,
                  country  :"adminupdatecountry"          
                 
                 }
              
                 this.timeout(15000)
                 chai.request(app)		  
                .post('/api/accUpdateUser')		  
                .set({'Authorization':'Bearer ' + admintoken})	
                .send(body)
                .end((err, res) => {	
                 
                  res.body.should.have.status(true);
                  res.body.should.be.a('object');			  
                  done();	  
                })	
            }); 
           it('Admin Logout api', 
           (done) => 
               {	  
               	  
                    chai.request(app)		  
                    .post('/api/adminout')
                    .set({'Authorization':'Bearer ' + admintoken})	      
                    .end((err, res) => {	
                        res.body.should.have.status(true);			  
                        res.body.should.be.a('object');			  
                        done();		  
                    });	
              });  
  });  
 
  describe('Delete test data from database', function() {
    
     it("Delete test data in users collection", function(done) {
         db.user.remove({ _id: userIde }).then(function (response) {
           done()
         })
        
       
   })
   
 
    it("Delete test data in Adreq collection", function(done) {
      
     db.adReq.remove({ _id: adIde }).then(function (response) {
         done()
       })
     }) 
   }) 