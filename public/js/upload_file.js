let upload_image_main = document.querySelector('.upload_image_main')
let upload_image_box = document.querySelector('.upload_image_box')
let upload_image_choose_file = document.querySelector('.upload_image_choose_file')
let upload_image_input = document.querySelector('#upload_image_input')
let upload_image_img = document.querySelector('#upload_image_img')
let upload_image_heading = upload_image_box.querySelector('h2')
let upload_image_close_btn = document.getElementById('upload_image_close_btn')
let upload_file_image = document.getElementById('upload_file_image')
let upload_image_form = document.getElementById('upload_image_form')
let upload_story_main = document.querySelector('.upload_story_main')
let upload_story_close_btn = document.getElementById('upload_story_close_btn')
let upload_file_story = document.getElementById('upload_file_story')
let upload_story_container = document.querySelector('.upload_story_container')

upload_image_input.addEventListener('change',(e)=>{
	let file = e.target.files[0]
	let reader =  new FileReader()
	reader.onload = function  (e) {
		upload_image_img.src = e.target.result
		upload_image_heading.style.display = 'none'

		// let cropper = new Cropper(upload_image_box)
	}

	reader.readAsDataURL(file)



})

upload_file_image.addEventListener('click',()=>{
	upload_image_main.style.display = 'flex'
})


upload_image_close_btn.addEventListener('click',()=>{
	upload_image_main.style.display = 'none'
})


upload_image_form.addEventListener('submit',()=>{
	upload_image_main.style.display = 'none'


})


upload_story_close_btn.addEventListener('click',()=>{
	upload_story_main.style.display = 'none'
})

upload_file_story.addEventListener('click',()=>{
	upload_story_main.style.display = 'flex'

})



upload_story_container.addEventListener('submit',(e)=>{
	e.preventDefault()

	let title = upload_story_container.querySelector('input').value
	let content = CKEDITOR.instances.content.getData()

	let data = {title:title,content:content}

	let parmas = {
		'method':'post',
		 headers:{
    	  'Content-type':'application/json'
    	},
    	body:JSON.stringify(data)
	}


	fetch('/upload-story',parmas).then((data)=>{
		return data.json()
	}).then((response)=>{
		console.log(response)
		alert(response.data)
		
		upload_story_container.querySelector('input').value = ''
		upload_story_main.style.display = 'none'
	})

})