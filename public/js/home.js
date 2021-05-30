let index_box_bottom_add_post_btn = document.querySelectorAll('.index_box_bottom_add_post_btn')
let index_box_bottom_comment = document.querySelector('.index_box_bottom_comment')
let name = document.querySelector('.name').innerText



index_box_bottom_add_post_btn.forEach((item) => {
  item.addEventListener('click',(e) => {
    console.log('clicked')

   // console.log(value)

   if(value=''){
   		alert("please add some comment")
   }

   else{
   		let value = item.parentNode.querySelector('input').value
   			
   		let insert = item.parentNode.parentNode.querySelector('.index_box_bottom_comment')	
		let div = document.createElement('div')			
		div.className = 'index_box_bottom_comment_box'
		div.innerHTML = `<cite>${name}</cite>
						<p>${value}</p>`

		insert.appendChild(div)				
						
    let id  = item.parentNode.parentNode.querySelector('.index_box_bottom_comment').querySelector('small').innerText 
		

    fetch(`/add-comment-image/${id}/${value}`).then((data)=>{
      return data.json()
    }).then((response)=>{
      console.log(response)
    })

    item.parentNode.querySelector('input').value = ''



		

   }

  });
})



let index_box_bottom_like_btn = document.querySelectorAll('.index_box_bottom_like_btn')

index_box_bottom_like_btn.forEach((item) => {
  item.addEventListener('click',(e)=>{
        let id  = item.parentNode.parentNode.querySelector('.index_box_bottom_comment').querySelector('small').innerText 


        item.innerHTML = `<img style="width: 23px;" src='/img/heart.png'/>`

    fetch(`/add-comment-image-like/${id}`).then((data)=>{
      return data.json()
    }).then((response)=>{
      console.log(response)
    })
     
    
  })
})







/// side bar _image

let all_the_post_id = []
let current_main_index = 0

let all_the_post = document.querySelectorAll('.index_box')

all_the_post.forEach((item) => {
  let id = item.querySelector('small').innerText
   
all_the_post_id.push(id)


})


let index_box_medium = document.querySelectorAll('.index_box_medium')

index_box_medium.forEach((item) => {
  item.addEventListener('click',(e)=>{

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




      let id = item.parentNode.querySelector('small').innerText
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


