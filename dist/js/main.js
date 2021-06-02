const url = 'dist/data.json';
const content = document.querySelector('.photographers')
const tags = document.querySelector('.tags')
let photographers = []
let tagList = []

const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    photographers = data.photographers
    photographers.forEach(data => {
        tagList.push(data.tags)
        let PhotographerData = new Photographer(data)
        content.appendChild(PhotographerData.createCard())
    })
    tagList = new Set(tagList.flat())
    tagList.forEach(item => {
        const element = document.createElement('li')
        element.textContent = `#${item}`
        tags.appendChild(element)
    })
}
getData()

// Photographer data object
// Data extraction
function Photographer(data) {
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
        const photographerDesk = document.createElement("p");
        const photographerTags = document.createElement("ul");
    
        photographerCard.classList.add("photographerCard"); 
        photographerName.classList.add("photographerCard__name"); 
        photographerDesk.classList.add("photographerCard__desc"); 
        photographerDesk.setAttribute("tabindex", "0");
        photographerTags.classList.add("tagList"); 
        photographerTags.setAttribute("tabindex", "0");
        photographerTags.setAttribute("aria-label", "Tags");

// DOM Generation
        photographerName.innerHTML = `
        <a href="photographPage.html?id=${this.id}">
        <img class="header__logo" src="public/images/Photographers/${this.portrait}"><br>${this.name}</a>"`;

        photographerDesk.innerHTML = `
        <strong>${this.city}, ${this.country} </strong> <br>
        ${this.tagline}<br>
        <em> $${this.price} day</em>`;

        this.tags.forEach(e => {
            const tag = document.createElement('li')
            tag.innerHTML = `#${this.tags[e]}`
            photographerTags.appendChild(tag)
        })
        
// DOM Display   
        photographerCard.appendChild(photographerName);
        photographerCard.appendChild(photographerDesk);
        photographerCard.appendChild(photographerTags);
        return photographerCard;
    };
}








