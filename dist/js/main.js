const url = 'dist/data.json';
const mainContent = document.querySelector('.main__content')
const headerTags = document.querySelector('.tagList')
let photographersList = []
let tagList = []

const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    // get photographers list (6)
    photographersList = data.photographers
    photographersList.forEach(data => {
    // get tags from photographers data
        tagList.push(data.tags)
    // call the constructor to build photographer profile
        let PhotographerData = new Photographer(data)
    // append the html elements to the DOM
        mainContent.appendChild(PhotographerData.createCard())
    })
    // make tags list unique
    tagList = new Set(tagList.flat())
    // append tags list to the DOM (header)
    tagList.forEach(item => {
        const elementLI = document.createElement('li')
        elementLI.textContent = `#${item}`
        headerTags.appendChild(elementLI)
    })
    // toggle tag active and inactive others
    const tagsList = document.querySelectorAll('li');
        tagsList.forEach(e => {
            e.addEventListener('click', () => {
                e.classList.add('activeTag')
                tagsList.forEach(f => {
                    if(f != e) {
                        f.classList.remove('activeTag')
                    }
                })
                // get selected tag for filtering
                const tagSelection = e.textContent
                // call the function to filter photographers
                getPhotographersList(tagSelection)
            })
        })
}
getData()

// Photographer data object
// Data extraction
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
// Function of photographer selection on tag filter
function getPhotographersList(tagSelection) {
    // selection of all photographers cards elements
    const selectAllPhotographers = document.querySelectorAll('.photographerCard')
    // remove '#' from tagSelectiob
    tagSelection = tagSelection.slice(1, tagSelection.length)
    // for loop on photographers list
    for(let i=0;i<photographersList.length;i++){
        let isTagInPhotographer = false
    // for loop on tags list for each photographer
        for(let j=0; j<photographersList[i].tags.length;j++){
            if(photographersList[i].tags[j] == tagSelection) {
                isTagInPhotographer = true
            }
    // DOM display selection photographer
            if(isTagInPhotographer) {
                selectAllPhotographers[i].style.display = "block"
            }
            else {
                selectAllPhotographers[i].style.display = "none"
            }
        }
    }
}











