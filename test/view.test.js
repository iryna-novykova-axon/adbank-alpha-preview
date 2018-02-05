  var express				=	require('express');
  var router				=	express.Router();
  var Route 				=	express.Route; 
  var userModel			=	require('../models/User');
  var mongoose			=	require('mongoose'); 
  mongoose.Promise		=	require('bluebird');
  var http				=	require('http')
  var chai				=	require('chai');
  var chaiHttp			=	require('chai-http');
  var app					=	require('../app');
  var should				=	require('chai').should();
  var expect				=	chai.expect;
  chai.use(chaiHttp);

  describe('User Views Testing', function() {
  it('GET /', function(done) 
  {        
      chai.request(app)        
      .get('/')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  });

  it('GET /Signup', function(done) 
  {        
      chai.request(app)        
      .get('/Signup')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  });

  it('GET /EnterFullInfo', function(done) 
  {        
      chai.request(app)        
      .get('/EnterFullInfo')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  });

  it('GET /dashboard', function(done) 
  {        
      chai.request(app)        
      .get('/dashboard')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  });

  it('GET /createCampaign', function(done) 
  {        
      chai.request(app)        
      .get('/createCampaign')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  })

  it('GET /addTokens', function(done) 
  {        
      chai.request(app)        
      .get('/addTokens')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  });
 
  it('GET /accountDetails', function(done) 
  {        
      chai.request(app)        
      .get('/accountDetails')        
      .end(function(err, res) 
       {            
           expect(res).to.have.status(200);            
           done();        
        });    
  });


})



describe('Admin Views Testing', function() {
    it('GET /admin', function(done) 
    {        
        chai.request(app)        
        .get('/admin')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    });
  
    it('GET /adminUserCamp', function(done) 
    {        
        chai.request(app)        
        .get('/adminUserCamp')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    });
  
    it('GET/campaigns/:email', function(done) 
    {        
        chai.request(app)        
        .get('/campaigns/:email')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    });
  
    it('GET /campEdit/:id', function(done) 
    {        
        chai.request(app)        
        .get('/campEdit/:id')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    });
  
    it('GET /userDetails/:email', function(done) 
    {        
        chai.request(app)        
        .get('/userDetails/:email')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    })
  
    it('GET /adminAccountDetails', function(done) 
    {        
        chai.request(app)        
        .get('/adminAccountDetails')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    });
   
    it('GET /accountDetails', function(done) 
    {        
        chai.request(app)        
        .get('/accountDetails')        
        .end(function(err, res) 
         {            
             expect(res).to.have.status(200);            
             done();        
          });    
    });
})