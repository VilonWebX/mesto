import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const profileButton = document.querySelector('.profile__edit-button'); //РЕДАКТИРОВАНИЕ ПРОФИЛЯ 
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close_type_profile');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const openAddMenuButton = document.querySelector('.profile__add-button')
const formElementMesto = document.querySelector('.popup__form_type_mesto');
const popupSave = document.querySelector('.popup__save')
const namedInput = formElementMesto.querySelector('.popup__input_type_named');
const linkInput = formElementMesto.querySelector('.popup__input_type_link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Башкирия',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Адыгея',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
}

const validationPopupProfile = new FormValidator(formElementProfile, config)
const validationPopupMesto = new FormValidator(formElementMesto, config)
validationPopupProfile.enableValidation()
validationPopupMesto.enableValidation()

const userInfo = new UserInfo({
  userName: '.profile__name', 
  userDescription: '.profile__job'
});

const popupWithImage = new PopupWithImage ('.popup-image')
popupWithImage.setEventListeners()

function createCard (name, link) {
  const card = new Card(name, link, '#template-elements', () => {
    popupWithImage.openImage(name, link);
  });
  return card.getView();
}


profileButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo()
  nameInput.value = name
  jobInput.value = description
  editPopupForm.open() 
  validationPopupProfile.enableValidation()
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
  validationPopupMesto.enableValidation()
})