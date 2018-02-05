var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	type				:		    { type: String,default:'user' },
	token				:		    { type: Number,default:0 },
	campaigns			:		    { type: Number,default:0 },
	firstname			:		    { type: String ,default:null},
    lastname		    :		    { type: String,default:null },
	email				:		    { type: String, required: true ,unique:true },
	password			:		    { type: String, required: true },
	phone				:		    { type: Number,default:null},
	birthday			:		    { type: String, default: null},
	gender		        :		    { type: String,default:null},
	address		        :		    { type: String,default:null},
	city		        :		    { type: String,default:null},
	state		        :		    { type: String,default:null},
	zip		            :		    { type: String,default:null},
	country		        :		    { type: String,default: null},
	status				:		    { type: Boolean,default: false},
	emailerToken		:		    { type: String,default: null},
	linkExpires			:		    { type: Date , default: null},
	resetPasswordToken	:		    { type: String,default: null},
	resetPasswordExpires:		    { type: Date , default: null},
	theme               :           { type: String ,default:"/css/paper-dashboard.css"}

});


var adminSchema = new Schema({
	
	type				:		    { type: String,default:'Admin' },
	username			:		    { type: String,default: null },
	token				:		    { type: String,default:null },
	campaigns			:		    { type: String,default:null },
	firstname			:		    { type: String ,default:null},
    lastname		    :		    { type: String,default:null },
	email				:		    { type: String, required: true ,unique:true },
	password			:		    { type: String, required: true },
	phone				:		    { type: String,default:null},
	birthday			:		    { type: String},
    address		        :		    { type: String,default:null},
	city		        :		    { type: String,default:null},
	state		        :		    { type: String,default:null},
	zip		            :		    { type: String,default:null},
	country		        :		    { type: String,default: null},
	status				:		    { type: Boolean,default: false},
	emailerToken		:		    { type: String,default: null},
	linkExpires			:		    { type: Date , default: null},
	resetPasswordToken	:		    { type: String,default: null},
	resetPasswordExpires:		    { type: Date , default: null},
	theme               :           { type: String ,default:"/css/paper-dashboard.css"}
});

var adRequestSchema = new Schema({
	

	status				 :  { type: String,default: "disabled"},
	LargeRec             :  { type: String,default: null}, 
	MediumRec            :  { type: String,default: null}, 
	leaderboard          :  { type: String,default: null},
	halfpage             :  { type: String,default: null},
	largeImage           :  { type: String,default: null},   
	email                :  { type: String,default: null}, 
	totalTokenSpend      :  { type: Number,default: null}, 
	name                 :  { type: String,default: null},
	link                 :  { type: String,default: null},  
});

var tokenRequestSchema = new Schema({
	
	status				:		    { type: Boolean,default: false},
	tokens                :         { type: Number,default: null}, 
	
});

var user = mongoose.model('user', userSchema);
var admin = mongoose.model('admin', adminSchema);
var adReq = mongoose.model('adReq',adRequestSchema);
var tokReq = mongoose.model('tokReq',tokenRequestSchema);

module.exports ={
	user,
	admin,
	adReq,
	tokReq
}




