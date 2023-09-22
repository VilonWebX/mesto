import Card from './scripts/Card.js'
import FormValidator from './scripts/FormValidator.js'
import Popup from './scripts/Popup.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей


const profileButton = document.querySelector('.profile__edit-button'); //РЕДАКТИРОВАНИЕ ПРОФИЛЯ 
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');

const openAddMenuButton = document.querySelector('.profile__add-button')
const formElementMesto = document.querySelector('.popup__form_type_mesto');
const namedInput = formElementMesto.querySelector('.popup__input_type_named');
const linkInput = formElementMesto.querySelector('.popup__input_type_link');

const arxizImage = new URL('./image/kirillpershin1556355unsplash1.jpg', import.meta.url);
const bashkiriyImage = new URL('./image/kirillpershin1556355unsplash1.jpg', import.meta.url)
const ivanovoImage = new URL('./image/kirillpershin1556355unsplash1.jpg', import.meta.url)
const kamchatkaImage = new URL('./image/kirillpershin1556355unsplash1.jpg', import.meta.url)
const adegeaImage = new URL('./image/kirillpershin1556355unsplash1.jpg', import.meta.url)
const baikalImage = new URL('./image/kirillpershin1556355unsplash1.jpg', import.meta.url)

const initialCards = [
  {
    name: 'Архыз',
    link: arxizImage
  },
  {
    name: 'Башкирия',
    link: bashkiriyImage
  },
  {
    name: 'Иваново',
    link: ivanovoImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Адыгея',
    link: adegeaImage
  },
  {
    name: 'Байкал',
    link: baikalImage
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
} 
const validationPopupProfile = new FormValidator(formElementProfile, validationConfig)
const validationPopupMesto = new FormValidator(formElementMesto, validationConfig)
validationPopupProfile.enableValidation()
validationPopupMesto.enableValidation()

const userInfo = new UserInfo({
  userNameSelector: '.profile__name', 
  userDescriptionSelector: '.profile__job'
});

const popupWithImage = new PopupWithImage ('.popup-image')
popupWithImage.setEventListeners()

function createCard (name, link) {
  const card = new Card(name, link, '#template-elements', () => {
    popupWithImage.open(name, link);
  });
  return card.getView();
}


profileButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo()
  nameInput.value = name
  jobInput.value = description
  editPopupForm.open() 
  validationPopupProfile.enableSubmitButton()
})

const cardsSection = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link)
    cardsSection.addItem(cardElement)
  }
}, '.element-container')
cardsSection.render()


const editPopupForm = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo({
    name: data[nameInput.name],
    description: data[jobInput.name] 
  })
  editPopupForm.close()
})
editPopupForm.setEventListeners()

const addPopupForm = new PopupWithForm('.popup_type_mesto', (data) => {
  const cardElement = createCard(data[namedInput.name], data[linkInput.name]);
  cardsSection.addItem(cardElement);
  addPopupForm.close();
});

addPopupForm.setEventListeners()

openAddMenuButton.addEventListener('click', function () {
  addPopupForm.open()
  validationPopupMesto.disableSubmitButton()
})