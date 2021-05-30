const mongoose = require('mongoose')

const signinSchema = new mongoose.Schema({
	
	googleId:{
		type:String
	},
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	password:{
		type:String,
		default:null
	},
	posts:{
		type:String,
		default:'0'
	},
	no_of_followers:{
		type:String,
		default:'0'
	},
	following:{
		type:String,
		default:'[]'
	},
	about:{
		type:String,
		default:''
	}
})



module.exports = new mongoose.model("instagramPerson",signinSchema)




































