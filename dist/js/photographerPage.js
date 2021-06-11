const url = 'dist/data.json';
// get url params from ?id=
const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')
let photographersList = []
let photosList = []
const photos = document.querySelector('.photos')
let photographerName = ''

// fetch data from backend
const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    // get list of photographers data for id
    photographersList = data.photographers
    photographersList.forEach(data => {
        if(data.id == photographerID) {
        // store photographer name for photos dir path
            photographerName = data.name
            photographerName = photographerName.split(' ')
            photographerName = photographerName[0]
        // set document title
            document.title = `${data.name} Page`
        // Constructor class to build profiles
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
    const getPhotos = async () => {
    const res = await fetch(url)
    const data = await res.json()
    console.log({photographerName})
    // get list of photos data by photographerId
    photosList = data.media
    photosList.forEach(data => {
        if(data.photographerId == photographerID) {
            //console.log(data.image)
            if(data.image == undefined) {
                const video = document.createElement('video')
                video.controls = true
                const source = document.createElement('source')
                source.src = `public/images/Sample/${photographerName}/${data.video}`
                source.type = "video/mp4"
                video.appendChild(source)
                photos.appendChild(video)
            } else {
                const element = document.createElement('img')
                element.src = `public/images/Sample/${photographerName}/${data.image}`
                photos.appendChild(element)
            }
        }
    })
}
getPhotos()



