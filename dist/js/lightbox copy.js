// DOM Elements
const modalLightbox = document.querySelector('.modalLightbox')
const modalLightbox_Close = document.querySelector('.modalLightbox__close')
const mediaShow = document.querySelector('#mediaShow')
const mediaName = document.querySelector('#mediaName')

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

// Slideshow
let slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".mediaCard");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

