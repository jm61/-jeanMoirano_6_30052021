// DOM Elements
const modalLightbox = document.querySelector('.modalLightbox')
const modalLightbox_Close = document.querySelector('.modalLightbox__close')
const mediaShow = document.querySelector('#mediaShow')
const mediaName = document.querySelector('#mediaName')
const prevMedia = document.querySelector('#lightboxButton_left')
const nextMedia = document.querySelector('#lightboxButton_right')

// Open Lightbox with focused media and media test
function launchModalMedia(media,title,photographer) {
  modalLightbox.style.display = "block"
  mediaName.textContent = title
  let mediaTest = media.split('.')
  if(mediaTest[1] === 'jpg') {
  mediaShow.innerHTML = 
  `<img src="public/images/Sample/${photographer}/${media}" style="width:50%;" />`
  } else {
    mediaShow.innerHTML = 
  `<video src="public/images/Sample/${photographer}/${media}" style="width:50%;" controls />`
  }
}

// Close Lightbox
modalLightbox_Close.addEventListener('click', e => {
  e.preventDefault()
  modalLightbox.style.display = "none"
})

