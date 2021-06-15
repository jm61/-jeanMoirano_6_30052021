const url = 'dist/data.json';
// get url params from ?id=
const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')
let photographersList = []
//let mediaList = []
const photosGallery = document.querySelector('.photosGallery')
const modalTitle = document.querySelector('.modalForm__body__title')
let photographerName = ''
let photographerPrice = 0
let total = []

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
// Photos Gallery section
    const getPhotos = async () => {
    let mediaData
    //let total = []
    const res = await fetch(url)
    const data = await res.json()
    console.log({photographerName})
    // get list of photos data by photographerId
    mediaData = data.media
    mediaData.forEach(media => {
        if(media.photographerId == photographerID) {
            photosGallery.appendChild(CreateMediaCard(media))
            total.push(media.likes)
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

const CreateMediaCard = (media) => {
    let cardObj = new mediaCardParts("card", media)
    let descObj = new mediaCardParts("desc", media)
    let mediaObj
    if(media.image == undefined){
        mediaObj = new mediaCardParts("video", media)
    }
    else{
        mediaObj  = new mediaCardParts("image", media)
    }
    cardObj.mediaCard.appendChild(mediaObj.mediaMedia)
    cardObj.mediaCard.appendChild(descObj.mediaDesc)

    return cardObj.mediaCard
}
// Intermediary between the actual factories classes and the user
class mediaCardParts{
    constructor(type, mediaData){
        if(type === "card"){
            return new MediaCard()
        }

        if(type === "desc"){
            return new MediaFactory_desc(mediaData)
        }

        if(type === "video"){
            return new MediaVideo(mediaData)
        }

        if(type === "image"){
            return new MediaImage(mediaData)
        }
    }
}

// Various factories used to build a mediaCard
class MediaCard{
    constructor(){
        this.mediaCard = document.createElement("div")
        this.mediaCard.classList.add("mediaCard")
    }
}
class MediaVideo{
    constructor(mediaData){
        this.mediaMedia = document.createElement("div")
        // this.mediaMedia.classList.add("mediaCard__image") 
        this.mediaMedia.classList.add("modalMedia_open")
        this.mediaMedia.innerHTML = `<a href="#" > <video alt="${mediaData.title}" controls> <source src="public/images/Sample/${photographerName}/${mediaData.video}" type="video/mp4">${mediaData.title}, closeup view </video> </a>`
    }
}
class MediaImage{
    constructor(mediaData){
        this.mediaMedia = document.createElement("div")
        //this.mediaMedia.classList.add("mediaCard__image") 
        this.mediaMedia.classList.add("modalMedia_open")
        this.mediaMedia.innerHTML = `<a href="#" > <img src="public/images/Sample/${photographerName}/${mediaData.image}" alt="${mediaData.title}, closeup view"></a>`
    }
}
class MediaFactory_desc{
    constructor(mediaData){
        this.mediaDesc = document.createElement("div")
        this.mediaName = document.createElement("p")
        this.mediaLike = document.createElement("p")

        this.mediaDesc.classList.add("mediaCard__desc") 
        this.mediaName.classList.add("mediaCard__desc__name") 
        this.mediaLike.classList.add("mediaCard__desc__number") 
        this.mediaLike.classList.add("add_like_button") 

        this.mediaName.innerHTML = mediaData.title
        this.mediaLike.innerHTML = `${mediaData.likes} <i class="fas fa-heart" aria-label="likes"></i>`
        this.mediaLike.addEventListener('click', () => {
            this.mediaLike.innerHTML = `${++mediaData.likes} <i class="fas fa-heart" aria-label="likes"></i>`
            // dynamic update of total likes footer
            document.querySelector('.footer__likesTotal').innerHTML = `${++total} <i class="fas fa-heart">`
        })
        this.mediaDesc.appendChild(this.mediaName)
        this.mediaDesc.appendChild(this.mediaLike)
    }
}


