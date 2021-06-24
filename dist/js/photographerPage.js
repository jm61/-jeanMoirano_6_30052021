const url = 'dist/data.json';
// get url params from ?id=
const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')
let photographersList = []
//let mediaList = []
const photosGallery = document.querySelector('.photosGallery')
const modalTitle = document.querySelector('.modalForm__body__title')
const filter = document.querySelector('.filter')
let photographerName = ''
let photographerPrice = 0
let total = []
let filterOrder
let photoDate = []
let photoLikes = []
let photoTitle = []
let photoIndex = []

// fetch data from backend
const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
// get list of photographers data for id
    photographersList = data.photographers
    photographersList.forEach(data => {
        if(data.id == photographerID) {
// store photographer price and name for photos dir path
            photographerName = data.name
            modalTitle.innerHTML = `Contactez-moi<br>${photographerName}`
            photographerPrice = data.price
            photographerName = photographerName.split(' ')
            photographerName = photographerName[0]
        // set document title
            document.title = `${data.name} Page`
        // Constructor class to build profile
            new Photographer(data)
        }
    })
}
getData()

// Photographer profile class
class Photographer {
    constructor(data) {
    this.id = data.id;
    this.portrait = data.portrait;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.tags = data.tags;
    this.createProfile()    
    }

// DOM selectors
  createProfile() {
    const profileName = document.querySelector('.profile__details__name')
    const profileLocation = document.querySelector('.profile__details__location')
    const profileTagline = document.querySelector('.profile__details__tagline')
    const profileImage = document.querySelector('.profile__image')
    const tagList = document.querySelector('.tagList')

// DOM data injection
    profileName.textContent = this.name
    profileLocation.textContent = `${this.city}, ${this.country}`
    profileTagline.textContent = this.tagline
    profileImage.src = `public/images/Photographers/${this.portrait}`
    profileImage.alt = `image de ${this.portrait}`
    // tag list
    this.tags.forEach(e => {
        const tag = document.createElement('li')
        tag.textContent = `#${e}`
        tagList.appendChild(tag)
        }) 
        return
    }
}

// Photos Gallery sectioninnerMedia
    const getPhotos = async () => {
    let mediaData
    //let total = []
    const res = await fetch(url)
    const data = await res.json()
    console.log({photographerName})
    // get list of photos data by photographerId
    mediaData = data.media
    mediaData.forEach((media) => {
        if(media.photographerId == photographerID) {
            photosGallery.appendChild(CreateMediaCard(media))
            total.push(media.likes)
    // store data for filtering option
            photoTitle.push(media.title)
            photoLikes.push(media.likes)
            photoDate.push(media.date)
            ++photoIndex
        }
    })

// Get Selected Filter & Sort
filter.addEventListener('change', e => {
    filterOrder = e.target.value
    if(filterOrder == 'date') {
        console.log(photoDate.sort())
    }
    else if(filterOrder == 'title') {
        console.log(photoTitle.sort())
    }
    else if(filterOrder == 'popularity') {
        console.log(photoLikes.sort((a,b) => b-a ))
    }
})

// DOM footer setup
    const likesTotal = document.querySelector('.footer__likesTotal')
    likesTotal.innerHTML = `${total.reduce((acc,el) => acc+el,0)} <i class="fas fa-heart">`
    // set total for footer update
    total = total.reduce((acc,el) => acc+el,0)
    const price = document.querySelector('.footer__price')
    price.innerHTML = `${photographerPrice}€ / jour`
}
getPhotos()

// Class constructor
// ----------------------------------------------------------------------- //

const CreateMediaCard = media => {
    let card = new mediaCardParts("card", media)
    let cardDetails = new mediaCardParts("details", media)
    let cardMedia
    if(media.image == undefined){
        cardMedia = new mediaCardParts("video", media)
    }
    else{
        cardMedia  = new mediaCardParts("image", media)
    }
    card.mediaCard.appendChild(cardMedia.innerMedia)
    card.mediaCard.appendChild(cardDetails.mediaDetails)
    return card.mediaCard
}
// Building parts of the card
class mediaCardParts{
    constructor(type, mediaData){
        // create card container
        if(type === "card"){
            this.mediaCard = document.createElement("div")
            this.mediaCard.classList.add("mediaCard")
        }
        // create details of the media card
        if(type === "details"){
            this.mediaDetails = document.createElement("div")
            this.mediaName = document.createElement("p")
            this.mediaLike = document.createElement("p")
            this.mediaDetails.classList.add("mediaCard__details") 
            this.mediaName.classList.add("mediaCard__details__name") 
            this.mediaLike.classList.add("mediaCard__details__number") 
            this.mediaLike.classList.add("add_like_button") 
            this.mediaName.innerHTML = mediaData.title
            this.mediaName.dataset.index = mediaData.id
            this.mediaLike.innerHTML = `${mediaData.likes} <i class="fas fa-heart" aria-label="likes"></i>`
            this.mediaLike.addEventListener('click', () => {
            this.mediaLike.innerHTML = `${++mediaData.likes} <i class="fas fa-heart" aria-label="likes"></i>`
            // dynamic update of total likes footer
            document.querySelector('.footer__likesTotal').innerHTML = `${++total} <i class="fas fa-heart">`
            })
            this.mediaDetails.appendChild(this.mediaName)
            this.mediaDetails.appendChild(this.mediaLike)
        }
        // create DOM for video media
        if(type === "video"){
            this.innerMedia = document.createElement("div")
            this.innerMedia.classList.add("modalMedia_open")
            // Open Lightbox
            this.innerMedia.addEventListener('click', () => {
                launchModalMedia(mediaData.video,mediaData.title,photographerName)
            })
            this.innerMedia.innerHTML = `<a href="#" > <video alt="${mediaData.title}" > <source src="public/images/Sample/${photographerName}/${mediaData.video}" type="video/mp4">${mediaData.title}, closeup view </video> </a>`
        }
        // create DOM for image media
        if(type === "image"){
            this.innerMedia = document.createElement("div")
            this.innerMedia.classList.add("modalMedia_open")
            // Open Lightbox
            this.innerMedia.addEventListener('click', () => {
                launchModalMedia(mediaData.image, mediaData.title, photographerName)
            })
            this.innerMedia.innerHTML = `<a href="#" > <img src="public/images/Sample/${photographerName}/${mediaData.image}" alt="${mediaData.title}, closeup view"></a>`
        }
    }
}





