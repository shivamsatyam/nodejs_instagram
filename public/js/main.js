

let main_post_btn = document.querySelectorAll('.main_post_btn')
let main_like_box_like = document.querySelectorAll('.main_like_box_like')

main_post_btn.forEach((item) => {
  item.addEventListener('click',(e)=>{

      let id = document.querySelector('.main_box').querySelector('small').innerText
 

      let value = item.parentNode.querySelector('input').value
      if(value==""){
        alert("please add some comment")
      }else{

        let div = document.createElement('div')
        div.className = 'main_comment_box'
        div.innerHTML = `<div class="main_comment_box_image">
                  <img src="${document.querySelector('.main_box').querySelector('.main_box_second_top_image').querySelector('img').src}}" alt="">
                </div>

                    <p>
                      <cite>${document.querySelector('.main_box').querySelector('.main_box_second_top').querySelector('h2').innerText}</cite>
                      <p>${value}</p>
                    </p>
`

  document.querySelector('.main_comment').appendChild(div)




         fetch(`/add-comment-image/${id}/${value}`).then((data)=>{
              return data.json()
            }).then((response)=>{
              console.log(response)
              item.parentNode.querySelector('input').value = ''
            })

      }


  })
})


main_like_box_like.forEach((item) => {
 item.addEventListener('click',(e)=>{
  console.log('click')
      let id = document.querySelector('.main_box').querySelector('small').innerText
  console.log(id)

        item.innerHTML = `<img style="width: 23px;" src='/img/heart.png'/>`

    fetch(`/add-comment-image-like/${id}`).then((data)=>{
      return data.json()
    }).then((response)=>{
      console.log(response)
    })
     
 

  })

})


let main_cut_box = document.querySelector('.main_cut_box')

main_cut_box.addEventListener('click',(e)=>{
    document.querySelector('.main').style.display = 'none'
})

