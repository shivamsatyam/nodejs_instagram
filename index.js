require('dotenv').config()
const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer')
const passport = require('passport');
const bcrypt = require('bcryptjs')
const Html5Entities = require('html-entities').Html5Entities
const validator = require('validator')
const path = require('path')
const MongoStore = require('connect-mongo')(session)
const app = express()
const port = process.env.PORT || 3000
const Message = require('./models/message')
// satyameb28879a

const userSchema = require('./models/signin_schema')
const upload_image_schema = require('./models/upload_image_schema')
const upload_story_schema = require('./models/upload_story_schema')
require('./passport_setup');

app.use(session({
 	secret:"shivamInstagram",
 	resave:false,
 	saveUninitialized:true,
 	store:new MongoStore({
 		url:'mongodb+srv://shivamsatyam:shivamsatyam123@cluster0.hrigk.mongodb.net/shivamInstagram?retryWrites=true&m=majority',
 		mongooseConnection:mongoose.connection,
 		ttl:14*24*60*60
 	})
 }))
 


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
const static_path = path.join(__dirname,'public')
app.use(express.static(static_path))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://shivamsatyam:shivamsatyam123@cluster0.hrigk.mongodb.net/shivamInstagram?retryWrites=true&m=majority',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=>{
	console.log('the connection is succesfully established')
})


const isLoggedIn = (req,res,next)=>{
	if (req.user) {
		next();
	}else{
		res.redirect('/google')
	}
}

const Storage = multer.diskStorage({
	destination:'./public/upload',
	filename:(req,file,cb)=>{
		cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
	}
})

const upload = multer({
	storage:Storage
}).single('file')



//initializing the passport js
app.use(passport.initialize());
app.use(passport.session());

app.get('/home',isLoggedIn,(req,res)=>{
		console.log(req.user)
		if(req.user.following =='[]'){
			console.log('follow')
				res.redirect('/follow')
		}else{
			userSchema.findOne({'_id':req.user.id},(err,data)=>{
				// console.log(data)
				let following = JSON.parse(data.following)
				console.log(following)

				let all_the_id = []

				following.forEach((item) => {
				  all_the_id.push(item.follow_id)
				})


				upload_image_schema.find(({id:{$in:all_the_id}}),(err,docs)=>{
					
					console.log(docs)
					res.render('index',{id:req.user._id,following:following,post:docs,name:data.name,image:data.image})
				})


			})

		}
		
			
})


app.get('/',isLoggedIn,(req,res)=>{
	
		userSchema.find({'_id':req.user._id},(err,data)=>{
		console.log(data)
		let person = JSON.parse(data[0].following)
		res.render('chat',{data:person,real:data[0]})
	})



})



app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  }
);


app.get('/profile',isLoggedIn,(req,res)=>{
	let id = req.user._id
	userSchema.findOne({'_id':id},(err,data)=>{
		if(err){throw err}
		if(data){
			res.render('profile',{data:data,id:req.user._id})
		}	
	})

})

app.get('/show-profile/:id',isLoggedIn,(req,res)=>{
	let id = req.params.id
	userSchema.findOne({'_id':id},(err,data)=>{
		if(err){throw err}
		if(data){
			res.render('profile',{data:data,id:req.user._id})
		}	
	})

})




app.get('/follow',isLoggedIn,(req,res)=>{

	let person = []

	userSchema.find({},(err,data)=>{
		console.log('\n\n\n\n\n\nfollow\n\n\n\n')
		console.log(data)

		userSchema.findOne({_id:req.user.id},(err,docs)=>{
			let following = JSON.parse(docs.following)

			for (let i=0;i<following.length;i++) {
				
					for(let j=0;j<data.length;j++){

						if(String(following[i].follow_id)==String(data[j]._id)){

						}else{
							person.push(data[j])
						}

					}		
			}

		})


		console.log('\n\n\n\n\n person \n\n\n\n\n\n')
		console.log(person)

		res.render('follow',{id:req.user._id,data:person})

	})
})



app.get('/failed',(req,res)=>{
	res.send('failded')
})

app.post('/update-profile',(req,res)=>{
	let name =  req.body.name
	let about =  req.body.about
	userSchema.findOneAndUpdate({"_id":req.user._id},{"$set":{"name":name,"about":about}}).exec((err,data)=>{
		if(err){throw err}
		if(data){
			console.log(data)
			res.json({
				status:true
			})
		}	
	})

})

app.post('/upload-image',upload,(req,res,next)=>{
	let title = req.body.title
	let desc = req.body.desc
	let image = req.file.filename
	let a = new Date()

	upload_image_schema({
		id:req.user.id,
		name:req.user.name,
		title:title,
		desc:desc,
		image:image,
		time:a.toLocaleDateString(),
		user_image:req.user.image
	}).save((err)=>{
		if(err){throw err}
		else{
			res.redirect('/profile')
		}	
	})

})


app.post('/upload-story',(req,res)=>{
	let title = Html5Entities.encode(req.body.title)
	let content = Html5Entities.encode(req.body.content)
		let a = new Date()

	upload_story_schema({
		id:req.user.id,
		name:req.user.name,
		title:title,
		content:content,
		
		time:a.toLocaleDateString()
	}).save((err)=>{
		if(err){throw err}
		else{
			res.json({
				correct:true,
				data:"Story uploaded successfully"
			})
		}	
	})


})


app.get('/get-image/:user_id',(req,res)=>{
	let user_id = req.params.user_id
	upload_image_schema.find({'id':user_id},(err,data)=>{
		console.log(data)
		res.json({
			'correct':true,
			'data':data
		})
	})

})

app.get('/follow_user/:user_id/:follow_id',(req,res)=>{

	let user_id = req.params.user_id
	let follow_id = req.params.follow_id


	let follow_data  = null

	userSchema.findOne({'_id':follow_id},(err,data)=>{
		console.log(data)
			follow_data = data
			let no_of_followers = String(parseInt(data.no_of_followers) + 1)

			userSchema.updateOne({'_id':follow_id},{"$set":{"no_of_followers":no_of_followers}},(er,docs)=>{
				if(err){throw er}

			})


	})

	userSchema.findOne({'_id':user_id},(err,data)=>{
		console.log(data)
		if(data){
			let followers = JSON.parse(data.following)
			followers.push({"follow_id":follow_id,"name":follow_data.name,image:follow_data.image})
			console.log('followers')

			followers = JSON.stringify(followers)

			userSchema.updateOne({'_id':user_id},{"$set":{"following":followers}},(er,docs)=>{
				if(err){throw er}
				
				else{
					res.json({
						correct:true
					})
				}	
			})
		



		}
	})

})




app.get('/get_all/:id/:other',(req,res)=>{
	const id  = req.params.id
	const other  = req.params.other
	Message.find({$and:[{$or:[{from_id:id},{to_id:id}]},{$or:[{from_id:other},{to_id:other}]}]},(err,data)=>{
		if(err){
			throw err
		}else if(data){
			// data.forEach((item) => {
			//   item.message = Html5Entities.decode(item.message)
			// })
			res.json({
				response:true,
				data:data
			})
		}else{
			res.json({
				response:false,
				data:null
			})
		}
	})
})

app.post('/message',(req,res)=>{
	const sender = req.body.sender
	const receiver = req.body.receiver
	const  message= req.body.message

	let date = new Date()
	new Message({
		from_id:sender,
		to_id:receiver,
		message:Html5Entities.encode(message),
		time_stamp:date.toLocaleTimeString(),
	}).save((err)=>{
		if(err){throw err}
			else{
				console.log('save')
			}
	})

})


app.get('/add-comment-image/:id/:comment',(req,res)=>{
	let id  = req.params.id
	let comment = req.params.comment
	upload_image_schema.findOne({_id:id},(err,data)=>{
		if (err){throw err}
		else{

			let all_comment = JSON.parse(data.comment)
			all_comment.push({user_id:req.user.id,comment:comment,name:req.user.name,image:req.user.image})
			all_comment = JSON.stringify(all_comment)
			

			upload_image_schema.updateOne({_id:id},{"$set":{"comment":all_comment}},(err,docs)=>{
				if(err){throw err}
				else{
					res.json({
						correct:true
					})
				}	
			})

		}	

	})

})

app.get('/add-comment-image-like/:id',(req,res)=>{
	let id  = req.params.id
	
	upload_image_schema.findOne({_id:id},(err,data)=>{
		if (err){throw err}
		else{

			let like = String(parseInt(data.likes) + 1)
			
			upload_image_schema.updateOne({_id:id},{"$set":{"likes":like}},(err,docs)=>{
				if(err){throw err}
				else{
					res.json({
						correct:true
					})
				}	
			})

		}	

	})

})



app.get('/image-data/:id',(req,res)=>{
	let id = req.params.id

	upload_image_schema.findOne({'_id':id},(err,data)=>{
		if(err){throw err}
		else{
			res.json({
				correct:true,
				data:data
			})
		}	
	})
})


app.get('/alldata',(req,res)=>{
	userSchema.find({},(err,data)=>{
		res.json({
			data:data
		})
	})
})


let server = app.listen(port,()=>{
	console.log('the app is running')
})

let io = require('socket.io')(server)


io.on('connection',(socket)=>{
	console.log('client conneted')
	
	socket.emit('main',"boss")

	socket.on('send-message',(data)=>{
		console.log(data)
	})

	socket.on('response-message',(data)=>{
		console.log('response-message-main')
		console.log(data)
		data.message = Html5Entities.encode(data.message)
		io.emit('chat',data)
		console.log('chat message emitted')
	})


})

