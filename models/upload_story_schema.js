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
	content:{
		type:String,
		required:true
	},
	likes:{
		type:String,
		default:''
	},
	comment:{
		type:String,
		default:''
	},
	views:{
		type:String,
		default:''
	},
	time:{
		type:String,
		required:true
	}

})



module.exports = new mongoose.model("instagramStory",uploadSchema)




































