const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
	
	id:{
		type:String,
		required:true
	},	
	name:{
		type:String,
		required:true
	},
	title:{
		type:String,
		required:true
	},
	desc:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	likes:{
		type:String,
		default:'0'
	},
	comment:{
		type:String,
		default:'[]'
	},
	views:{
		type:String,
		default:'0'
	},
	time:{
		type:String,
		required:true
	},

	user_image:{
		type:String,
		required:true
	}

})



module.exports = new mongoose.model("instagramImage",uploadSchema)




































