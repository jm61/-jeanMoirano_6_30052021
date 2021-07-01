// DOM Elements Selection
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modalForm");
const modalBtn = document.querySelectorAll(".profile__contact");
const form = document.querySelector("#form");
const close = document.querySelector('.fa-times')
// Variables
const red = "#eee"
// check RegEx
const regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
const regexChars = /^[a-zA-Z\u00C0-\u00FF ]+$/

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", () => {
  modal.style.display = "block"
  modalForm.style.display = "block"
  modalForm.focus()
})
)
// close modal form with X
close.addEventListener('click', () => {
  modalForm.style.display = "none"
  modal.style.display = "none"
})

// Validation First Name
function validateFirstName() {
  if(checkIfEmpty(firstName)) return
  if(!checkOnlyLetters(firstName)) return
  if(!check2Letters(firstName)) return
  return true;
}
// Validation Last Name
function validateLastName() {
  if(checkIfEmpty(lastName)) return
  if(!checkOnlyLetters(lastName)) return
  if(!check2Letters(lastName)) return
  return true
}
// Validation Email
function validateEmail(){
  if(checkIfEmpty(email)) return
  if(!checkRegex(email)) return
  return true
}
// Validation Message
function validateMessage() {
  if(checkIfEmpty(message)) return
  return true
}
// -------------------------------------------- //

// Input empty check
function checkIfEmpty(field){
  if(isEmpty(field.value.trim())) {
       setInvalid(field, `le champ ${field.name} ne peut pas être vide`)
      return true
  } else {
      setValid(field)
      return false
  }
}
// Input length check
function check2Letters(field){
  if(field.value.length < 2){
    setInvalid(field, `le champ ${field.name} comprend au moins 2 caractères`)
    return false
  } else {
    setValid(field)
    return true
  }
}
// Input only letters check
function checkOnlyLetters(field) {
  if(regexChars.test(field.value)) {
      setValid(field)
      return true
  } else {
      setInvalid(field, `le champ ${field.name} comprend seulement des lettres`)
      return false
  }
}
// Email input check
function checkRegex(field, message){
  if(field.value.match(regexEmail)) {
    setValid(field)
    return true
  } else {
    message = `le champ ${field.name} doit être un email valide`
    setInvalid(field, message)
    return false
  }
}
// Input empty check
function isEmpty(value){
  if(value === "") return true
  return false
}

// Utilities Valid/Invalid
function setInvalid(field, message){
  field.nextElementSibling.innerHTML = message
  field.nextElementSibling.style.color = red
}
function setValid(field){
  field.nextElementSibling.innerHTML = ''
}

// Handle Form for submit
const test = form.addEventListener('submit', e => {
  e.preventDefault()

  if(validateFirstName() && validateLastName() && validateEmail() && validateMessage()) {
    submitForm()
  }
})

// Add keyboard events to close and submit the form
modalForm.addEventListener('keyup', function (event) {
  if (event.key === 'Escape') {
    modalForm.style.display = "none"
    modal.style.display = "none"
    console.log('Esc')
  }
  if (event.key === 'Enter') {
    test
  }
});

function submitForm(){
  modalForm.style.display="none"
  modal.style.display = "none"
  // Dump fields form
  for(i=0; i<form.elements.length; i++) {
    console.log(form.elements[i].value)
  }
  form.reset()
}
