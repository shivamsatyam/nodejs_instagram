fetch('/alldata').then((data)=>{
	return data.json()
}).then((response)=>{
	let data = response.data
	console.log('data')
	console.log(data)

	let input = document.getElementById('nav-second-input')
	let search_item = document.querySelector('.search_item')


	input.addEventListener('input',(e) => {
	  	let value = e.target.value.toLowerCase()

	  	if(value==''){
	  		search_item.style.display = 'none'
	  	}

	  	else{
			search_item.style.display = 'block'
	  		let str = ``

	  		data.forEach((item) => {
	  			// console.log(item)
	  		  let name = item.name.toLowerCase()
	  		  let id  =  item._id
	  		  let image = item.image
	  		  if(name.includes(value)){
	  		  	console.log('includes ' + name + " " + value)
	  		  		str += ` <a href="/show-profile/${id}">
	  		  		<div class="search_item_box">
                               <div class="search_item_box_image">
                                       <img src="${image}" alt="">
                               </div>
                               <h2>${name}</h2>
                        </div></a>`
	  		  



	  		  }
	  		})

	  		document.querySelector('.search_item').innerHTML = str

	  	}
	});





})