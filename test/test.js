var mongoose = require('mongoose');
var db= require('../models/User.js')
var assert =require('assert')
var chai=require('chai') 
var app =require('../app');
var userId=''
var adminId=''
var adId=''
describe('All Database Responses', function() {
 it("database Responses", function(done) {
     
        mongoose.connect('mongodb://localhost:27017/Ads',{useMongoClient:true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
        done();
        });
     });

 it("Response from Users", function(done) {
    db.user.find({}).then(function(response){
        if(response)
        done();
      })
    });
    
     
     it("Response from Admin", function(done) {
        db.admin.find({}).then(function(response){
            if(response)
            done();
        })
     });
   
     
 it("Response from Ad Requests", function(done) {
        db.adReq.find({}).then(function(response){
            if(response)
            done();
        });
     
    })
    
})

describe('Test to save in database', function() {
   
    it("Saving data in users collection", function(done) {
      
    db.user.find({  }).then(function (response) {
     
        if (response ) {
            var newData = new db.user({
                email           :   "sample@gmail.com",
                password        :   "123456",
                status          :    true
          });
            newData.save().then(function (response) {
            
                  if(response)
                   userId=response._id
                   done()
                })

        }
        else {
          console.log('no response from database')  
        }
    })
  })
  


   it("Saving data in admin collection", function(done) {
    
    db.admin.find({  }).then(function (response) {
        if (response) {
            var newData = new db.admin({
                email           :   "sample@gmail.com",
                password        :   "123456",
                status          :    true
          });
            newData.save().then(function (response) {
               
                if(response)
                  adminId=response._id 
                  done()
                })

        }
        else {
          console.log('no response from database')  
        }
    })
   
  })

   it("Saving data in Adreq collection", function(done) {
     
    db.adReq.find({}).then(function (response) {
  
        if (response) {
            var newData = new db.adReq({
                name            :    "sample",
                email           :    "sample@gmail.com",
                LargeRec        :    "test",
                MediumRec       :    "test",
                leaderboard     :    "test",
                halfpage        :    "test",
                largeImage      :    "test",
                totalTokenSpend :      2,
                link            :    "test"
          });
       
           newData.save().then(function(response) {
         
                if(response)
                   adId=response._id 
                   done()
                })

        }
        else {
          console.log('no response from database')  
        }
      })
    }) 
  })    
  
 describe('Delete test data from database', function() {
   
    it("Delete test data in users collection", function(done) {
        db.user.remove({ _id: userId }).then(function (response) {
          done()
        })
       
      
  })
  
 it("Delete test data in admin collection", function(done) {
    
    db.admin.remove({ _id: adminId }).then(function (response) {
        done()
      })
   
  })

   it("Delete test data in Adreq collection", function(done) {
     
    db.adReq.remove({ _id: adId }).then(function (response) {
        done()
      })
    }) 
  }) 


 