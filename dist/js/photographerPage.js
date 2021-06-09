const url = 'dist/data.json';
const mainContent = document.querySelector('.main__content')
const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')
let photographersList = []

const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    photographersList = data.photographers
    photographersList.forEach(data => {
        if(data.id == photographerID) {
            console.log(data.id)
            document.title = `${data.name} Page`
            let PhotographerData = new Photographer(data)
            mainContent.appendChild(PhotographerData.createCard())
        }
        })
}
getData()

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
    
// DOM Elements creation and CSS
    this.createCard = () => {
        const photographerCard = document.createElement("div");
        const photographerName = document.createElement("h2");
        const photographerDetails = document.createElement("p");
        const photographerTags = document.createElement("ul");
    
        photographerCard.classList.add("photographerCard"); 
        photographerName.classList.add("photographerCard__name"); 
        photographerDetails.classList.add("photographerCard__description"); 
        photographerTags.classList.add("tagList"); 

// DOM Generation
        photographerName.innerHTML = `
        <a href="photographerPage.html?id=${this.id}">
        <img src="public/images/Photographers/${this.portrait}"><br>${this.name}</a>"`;

        photographerDetails.innerHTML = `
        <strong>${this.city}, ${this.country} </strong> <br>
        ${this.tagline}<br>
        <em> $${this.price} day</em>`;

        this.tags.forEach(e => {
            const tag = document.createElement('li')
            tag.textContent = `#${e}`
            photographerTags.appendChild(tag)
        })

// DOM Display   
        photographerCard.appendChild(photographerName);
        photographerCard.appendChild(photographerDetails);
        photographerCard.appendChild(photographerTags);
        return photographerCard;
    };
  }
}