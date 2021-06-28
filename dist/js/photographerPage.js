const url = 'dist/data.json';
// get url params from ?id=
const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')
let photographersList = []
const photosGallery = document.querySelector('.photosGallery')
const modalTitle = document.querySelector('.modalForm__body__title')
const filter = document.querySelector('.filter')
let photographerName = ''
let photographerPrice = 0
let total = []
let photoTitle = []

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
    //this.id = data.id;
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

// Photos Gallery sectionInnerMedia
    const getPhotos = async () => {
    let mediaData
    let photoList = []
    const res = await fetch(url)
    const data = await res.json()
    // get list of photos data by photographerId
    mediaData = data.media
    mediaData.forEach((media) => {
        if(media.photographerId == photographerID) {
            photoList.push(media)
            photosGallery.appendChild(CreateMediaCard(media))
            total.push(media.likes)
        }
    })
            // Get Selected Filter & Sort
            filter.addEventListener('change', e => {
                let filterOrder = e.target.value
                // popularity selected
                if(filterOrder === 'popularity' ) {
                    photosGallery.innerHTML = ''
                    let sort1 = photoList.sort((a,b) => {
                        return b.likes - a.likes
                    })
                    sort1.forEach(media => {
                        photosGallery.appendChild(CreateMediaCard(media))
                        Lightbox.init()
                    })
                    } else if(filterOrder === 'date') {
                        photosGallery.innerHTML = ''
                        let sort2 = photoList.sort((a,b) => {
                            let da = new Date(a.date),
                            db = new Date(b.date);
                            return da - db
                        })
                        sort2.forEach(media => {
                        photosGallery.appendChild(CreateMediaCard(media))
                        Lightbox.init()
                        })
                    } else if(filterOrder === 'title') {
                        photosGallery.innerHTML = ''
                        let sort3 = photoList.sort((a,b) => {
                            let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                                if (fa < fb) {
                                return -1;
                                }
                                if (fa > fb) {
                                return 1;
                                }
                                return 0;
                            })
                        sort3.forEach(media => {
                        photosGallery.appendChild(CreateMediaCard(media))
                        Lightbox.init()
                        })
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
            this.innerMedia.innerHTML = `<a href="#" > <video alt="${mediaData.title}" src="public/images/Sample/${photographerName}/${mediaData.video}" type="video/mp4">${mediaData.title}, closeup view </video> </a>`
        }
        // create DOM for image media
        if(type === "image"){
            this.innerMedia = document.createElement("div")
            this.innerMedia.classList.add("modalMedia_open")
            this.innerMedia.innerHTML = `<a href="#" > <img src="public/images/Sample/${photographerName}/${mediaData.image}" alt="${mediaData.title}, closeup view"></a>`
        }
    }
}
// ------------- LIGHTBOX ----------------------------- //
/**
 * @property {HTMLElement} element
 * @property {string[]} gallery
 * @property {string} url
 */
class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('img,video'))
        // remove links on logo and portrait
        links.shift();links.shift();
        // get array of url and title
        const gallery = links.map(link => link.getAttribute('src'))
        photoTitle = links.map(link => link.getAttribute('alt'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(
                e.currentTarget.getAttribute('src'),
                gallery,
                e.currentTarget.getAttribute('alt'))
        }))
    }
    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e) {
        if(e.key === 'Escape') {
            this.close(e)
        } else if(e.key === 'ArrowLeft') {
            this.prev(e)
        } else if(e.key === 'ArrowRight') {
            this.next(e)
        }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    close(e) {
        e.preventDefault()
        this.element.style.display = "none"
        document.removeEventListener('keyup', this.onKeyUp)
    }
    /**
     * 
     * @param {MouseEvent/KeyboardEvent} e
     */
    next(e) {
        e.preventDefault()
        let i = this.gallery.findIndex(media => media === this.url)
        if(i === this.gallery.length -1) {
            i = -1
        }
        this.loadImage(this.gallery[i+1],photoTitle[i+1])
    }
    prev(e) {
        e.preventDefault()
        let i = this.gallery.findIndex(media => media === this.url)
        if(i === 0) {
            i = this.gallery.length
        }
        this.loadImage(this.gallery[i-1],photoTitle[i-1])
    }

  /**
  * @param {string} url
  * @param {string[]} gallery
  */
  constructor (url,gallery,photoTitle) {
      this.element = this.buildDom(url)
      this.gallery = gallery
      this.photoTitle = photoTitle
      this.loadImage(url,photoTitle)
      this.onKeyUp = this.onKeyUp.bind(this)
     document.body.appendChild(this.element)
     document.addEventListener('keyup', this.onKeyUp)
  }
  loadImage(url,photoTitle ) {
    this.url = null
    this.photoTitle = null
    const image = document.createElement('img')
    const video = document.createElement('video')
    const title = document.createElement('p')
    video.controls = true
    const container = this.element.querySelector('.lightbox__container')
    container.innerHTML = ''
    let mediaType = url.split('.')
    mediaType = mediaType[1]
    if(mediaType === 'jpg') {
        container.appendChild(image)
        container.appendChild(title)
        this.url = url
        image.src = url
        this.photoTitle = photoTitle
        title.textContent = photoTitle
    } else {
        container.appendChild(video)
        container.appendChild(title)
        this.url = url
        video.src = url
        this.photoTitle = photoTitle
        title.textContent = photoTitle
    }       
  }
  
    buildDom() {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
        <button class="lightbox__close"><i class="fas fa-times"></i></button>
     <button class="lightbox__nav lightbox__nav__left"><i class="fas fa-chevron-left"></i></button>
     <button class="lightbox__nav lightbox__nav__right"><i class="fas fa-chevron-right"></i></button>
     <div class="lightbox__container"></div>`
     dom.querySelector('.lightbox__close').addEventListener('click', 
         this.close.bind(this))
     dom.querySelector('.lightbox__nav__left').addEventListener('click', 
         this.prev.bind(this))
     dom.querySelector('.lightbox__nav__right').addEventListener('click', 
         this.next.bind(this))
     return dom
    }
}
  setTimeout(() => {
      Lightbox.init()
      console.log('init')
  },2000)











