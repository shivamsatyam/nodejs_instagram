let profile_form = document.querySelector('.profile_form')
let edit_profile_btn = document.getElementById('edit_profile_btn')
let update_profile = document.querySelector('.update_profile')
let edit_profile_cut = document.getElementById('edit_profile_cut')
let edit_profile_name = document.getElementById('edit_profile_name')
let edit_profile_desc = document.getElementById('edit_profile_desc')
let edit_profile_save = document.getElementById('edit_profile_save')
let profile_id = document.querySelector('.profile-id').innerText
let profile_name  = document.getElementById('profile-name')
let profile_post = document.getElementById('profile_post')
let profile_story = document.getElementById('profile_story')
let profile_user_data_posts = document.querySelector('.profile_user_data_posts')
let profile_user_data_story = document.querySelector('.profile_user_data_story')


let all_images = []
let all_posts = []

profile_form.addEventListener('submit',(e) => {
  	e.preventDefault()


});


edit_profile_save.addEventListener('click',()=>{
	let name = edit_profile_name.value
	let about = edit_profile_desc.value

	let fetch_data = {
		method:'post',
			headers:{
				'Content-type':'application/json',
			},
			body:JSON.stringify({name:name,about:about,id:profile_id})
	}


	fetch('/update-profile',fetch_data).then((data)=>{
		return data.json()
	}).then((response)=>{
		console.log(response)
		update_profile.style.display = 'none'
		if(response.status){
			profile_name.innerText = edit_profile_name

			alert("profile updated successfully")
		}else{
			alert("profile does not updated successfully")

		}
	})



})


edit_profile_btn.addEventListener('click',(e)=>{
	update_profile.style.display = 'flex'
})
edit_profile_cut.addEventListener('click',(e)=>{
	update_profile.style.display = 'none'
})





profile_post.addEventListener('click',(e)=>{
 profile_user_data_story.style.display = 'none'
 profile_user_data_posts.style.display = 'block'
})

profile_story.addEventListener('click',(e)=>{
 profile_user_data_posts.style.display = 'none'
 profile_user_data_story.style.display = 'block'
 
})


function get_image (after_load){
	if(all_images){
		fetch(`/get-image/${profile_id}`).then((data)=>{
			return data.json()
		}).then((response)=>{
				all_images = response.data
				console.log(response)
				console.log(response.data)
				let str = ``
			
			all_images.forEach((item) => {
		  	str +=`     <div class="profile_user_data_posts_box">
                       <small style="display:none;">${item._id}</small>
                         <img src="/upload/${item.image}" alt="">           
                       

                       <div class="profile_user_data_posts_box_func">
                           <h2>${item.title}</h2>    
                           <p>
                                 ${item.desc}
                           </p>


                           <div class="profile_user_data_posts_content" style="display:none;">
                                   <span><svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>

                ${item.likes}
        </span>
                                   <span>
                                           
                                           <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
                ${item.views}
                                   </span>
                           </div>

                       </div>

                      </div>  

 `
			})

	profile_user_data_posts.innerHTML = str

		after_load()


		})
	}else{
		console.log('all image')
	}



}





function after_load () {
    

console.log('after_load')

let profile_user_data_posts_box = document.querySelectorAll('.profile_user_data_posts_box')

profile_user_data_posts_box.forEach((item) => {
  item.addEventListener('click',(e)=>{

        console.log('click')
      document.querySelector('.main').style.display = 'grid'

      let main_box = document.querySelector('.main_box')
      let upload_image = main_box.querySelector('.main_box_first').querySelector('img')
      let user_image = main_box.querySelector('.main_box_second_top_image').querySelector('img')
      let user_name = main_box.querySelector('.main_box_second_top').querySelector('h2')
      let another_user_image  = main_box.querySelector('.main_box_second_medium_image').querySelector('img')

      let another_user_name = main_box.querySelector('.main_box_second_medium').querySelector('cite')

      let user_desc = main_box.querySelector('.main_box_second_medium').querySelector('p').querySelector('p')
      let main_comment = main_box.querySelector('.main_comment')

      let user_id = main_box.querySelector('small')




      let id = item.querySelector('small').innerText
      console.log(item)
      console.log(item.parentNode)
      console.log(item.parentNode.querySelector('small'))
      let data = null


      fetch(`/image-data/${id}`).then((data)=>{
        return data.json()
      }).then((response)=>{
        console.log(response)
        data = response.data

      upload_image.src = `/upload/${data.image}`
      user_image = data.user_image
      user_name = data.name
      another_user_image =  data.user_image
      another_user_name = data.name
      user_id.innerText = id
      user_desc = data.desc

      let comment = JSON.parse(data.comment)

      console.log(comment)

      let str = ``

      comment.forEach((com) => {
            str += `<div class="main_comment_box">
                <div class="main_comment_box_image">
                  <img src='${com.image}' alt="">
                </div>

                    <p>
                      <cite>${com.name}</cite>
                      <p>${com.comment}</p>
                    </p>

              </div>`

      })

      main_comment.innerHTML = str


      })
     


  })
})




}





get_image(after_load)