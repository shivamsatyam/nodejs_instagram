let chat_box_file = document.querySelector('.chat_box_file')
let btn = chat_box_file.querySelector('button')
let file_input = chat_box_file.querySelector('input')
let img = document.getElementById('a')

btn.addEventListener('click',(e) => {
  	file_input.click()

});


file_input.addEventListener('change',(e) => {
  	img.src = URL.createObjectURL(file_input.files[0])
});
