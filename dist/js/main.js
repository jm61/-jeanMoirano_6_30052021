const url = 'dist/data.json';
const mainContent = document.querySelector('.main__content')
const headerTags = document.querySelector('.tagList')
let photographersList = []
let tagList = []

// function to add/remove top banner (scroll event)
document.addEventListener("scroll", skipToContent);
function skipToContent() {
    const link = document.querySelector('.skiptocontent')
    const banner = document.querySelector('.header')
  if (window.scrollY >= banner.offsetHeight - 20) {
    link.style.top = "6px"
  }
  if (window.scrollY < banner.offsetHeight - 20) {
    link.style.top = "-100px"
  }
}
// fetch data photographers from json
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
    tagList = Array.from(tagList).sort()
    // append tags list to the DOM (header)
    tagList.forEach(item => {
        const elementLI = document.createElement('li')
        const elementA = document.createElement('a')
        elementA.classList.toggle('tagList__tag','header__tag')
        elementA.tabIndex = 0
        elementLI.appendChild(elementA)
        elementA.textContent = `#${item}`
        headerTags.appendChild(elementLI)
    })
    // toggle tag active and inactive others
    const tagsList = document.querySelectorAll('.tagList__tag');
        tagsList.forEach(el => {
        // mouse event management
            el.addEventListener('click', e => {
                e.preventDefault()
                el.classList.add('activeTag')
                    // get selected tag for filtering
                    const tagSelection = el.textContent
                    // call the function to filter photographers
                    getPhotographersList(tagSelection)
                tagsList.forEach(f => {
                    if(f != el) {
                        f.classList.remove('activeTag')
                    }
                })               
            })
        // keybboard event management
            el.addEventListener('keyup', e => {
                e.preventDefault()
                if(e.key === 'Enter') {
                    el.classList.add('activeTag')
                    // get selected tag for filtering
                    const tagSelection = el.textContent
                    // call the function to filter photographers
                    getPhotographersList(tagSelection)
                tagsList.forEach(f => {
                    if(f != el) {
                        f.classList.remove('activeTag')
                    }
                })
                }                             
            })
        })
}
getData()

// Photographer data object Data extraction
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
        <img src="public/images/Photographers/${this.portrait}" alt="${this.name}"><br>${this.name}</a>`;

        photographerDetails.innerHTML = `
        <strong>${this.city}, ${this.country} </strong> <br>
        ${this.tagline}<br>
        <em> €${this.price} /jour</em>`;

        this.tags.forEach(e => {
            const tag = document.createElement('li')
            const link = document.createElement('a')
            link.tabIndex = 0
            tag.appendChild(link)
            link.classList.add('tagList__tag','header__tag')
            link.textContent = `#${e}`
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
    const selectAllPhotographers = document.querySelectorAll('.photographerCard')
    // selection of all photographers cards elements
    // remove '#' from tagSelection
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
                //selectAllPhotographers[i].classList.toggle('nofilter')
                selectAllPhotographers[i].style.display = "block"
            } else {
                //selectAllPhotographers[i].classList.toggle('filter')
                selectAllPhotographers[i].style.display = "none"
            }
        }
    }
}











