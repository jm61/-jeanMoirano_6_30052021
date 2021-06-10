const url = 'dist/data.json';
const mainContent = document.querySelector('.main__content')
// get url params from ?id=
const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')
let photographersList = []

const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    // get list of photographers data for id
    photographersList = data.photographers
    photographersList.forEach(data => {
        if(data.id == photographerID) {
        // set document title
            document.title = `${data.name} Page`
        // Constructor class to build profiles
            let PhotographerData = new Photographer(data)
            mainContent.appendChild(PhotographerData.createProfile())
        }
        })
}
//getData()
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
    
// DOM Elements creation and CSS
    this.createProfile = () => {
       /*  const profile = document.createElement("div");
        const profileName = document.createElement("h1");
        const profileDetails = document.createElement("p");
        const profileTags = document.createElement("ul");
        const profileContact = document.createElement("button")
        const profileImage = document.createElement("img")
    
        profile.classList.add("profile"); 
        profileName.classList.add("profile__name"); 
        profileDetails.classList.add("profile__details"); 
        profileTags.classList.add("profile__tagList");
        profileContact.classList.add('profile__contact')
        profileImage.classList.add('profile__img')

// DOM Generation
        profileName.innerHTML = `${this.name}`;

        profileDetails.innerHTML = `
        <strong>${this.city}, ${this.country} </strong> <br>
        ${this.tagline}<br>`;

        this.tags.forEach(e => {
            const tag = document.createElement('li')
            tag.textContent = `#${e}`
            profileTags.appendChild(tag)
        })

        profileImage.innerHTML = `<img src="public/images/Photographers/${this.portrait}" class="photographerProfile__img">;`

        

// DOM Display   
        profile.appendChild(profileName);
        profile.appendChild(profileDetails);
        profile.appendChild(profileTags); */
        return ;
    };
  }
}