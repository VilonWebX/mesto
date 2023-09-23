import Card from './scripts/Card.js'
import FormValidator from './scripts/FormValidator.js'
import Popup from './scripts/Popup.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import Api from './scripts/Api.js';
import PopupDelete from './scripts/PopupDelete.js'
// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей


const profileButton = document.querySelector('.profile__edit-button'); //РЕДАКТИРОВАНИЕ ПРОФИЛЯ 
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
const openAvatarMenuButton = document.querySelector('.profile__avatar')

const openAddMenuButton = document.querySelector('.profile__add-button')
const formElementMesto = document.querySelector('.popup__form_type_mesto');
const namedInput = formElementMesto.querySelector('.popup__input_type_named');
const linkInput = formElementMesto.querySelector('.popup__input_type_link');
const formAvatar = document.querySelector('.popup__form_type_with-avatar')
const avatarInput = document.querySelector('.popup__input_href-avatar')
const elementsDelete = document.querySelector('.elements__delete')
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
const validationAvatar = new FormValidator(formAvatar, validationConfig)
validationPopupProfile.enableValidation()
validationPopupMesto.enableValidation()
validationAvatar.enableValidation()

const userInfo = new UserInfo({
  userNameSelector: '.profile__name', 
  userDescriptionSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar'
});

const popupWithImage = new PopupWithImage ('.popup-image')
popupWithImage.setEventListeners()

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '6eb95615-41bc-4a8d-9ae0-0a0f51b44964',
    'Content-Type': 'application/json'
  }
})

function createCard (name, link) {
  const card = new Card(name, link, '#template-elements', () => {
    popupWithImage.open(name, link)
  }, handleCardDelete: (cardID, cardElement) => {

  })
  return card.getView();
}



profileButton.addEventListener('click', () => {
  api.getUserInfo()
  .then(() => {
    const { name, description } = userInfo.getUserInfo()
    nameInput.value = name
    jobInput.value = description
    editPopupForm.open() 
    validationPopupProfile.enableSubmitButton()
  })
  .catch((err) => {
    console.log(err);
  })
})

openAvatarMenuButton.addEventListener('click', () => {
  validationAvatar.disableSubmitButton()
  avatarPopupForm.open()
})

const cardsSection = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link)
    cardsSection.addItem(cardElement)
  }
}, '.element-container')

api.getAllCards()
  .then(() => {
    cardsSection.render();
  })
  .catch((err) => {
    console.log(err);
  })


const editPopupForm = new PopupWithForm('.popup_type_profile', (data) => {
  editPopupForm.renderSaveLoading(true)
  api.setUserInfo({
    name: data[nameInput.name],
    description: data[jobInput.name] 
  })
  .then(() => {
    userInfo.setUserInfo({
      name: data[nameInput.name],
      description: data[jobInput.name] 
    })
    editPopupForm.close()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    setTimeout(() => {
      editPopupForm.renderSaveLoading(false)
    }, 1500)
  })
})

editPopupForm.setEventListeners()

const addPopupForm = new PopupWithForm('.popup_type_mesto', (data) => {
  addPopupForm.renderCreateLoading(true)
  api.setNewCard({
    name: data[namedInput.name],
    link: data[linkInput.name]
  })
  .then(() => {
    const isTrue = true;
    const cardElement = createCard(data[namedInput.name], data[linkInput.name], isTrue);
    cardsSection.addItem(cardElement);
    validationPopupMesto.disableSubmitButton()
    addPopupForm.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    setTimeout(() => {
      addPopupForm.renderCreateLoading(false);
    }, 1500)
  })
})

addPopupForm.setEventListeners()


const popupFormDelete = new PopupDelete('.popup_ques', {
  submitCallback: (id, card) => {
    api.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupFormDelete.close();
    })
    .catch((err) => alert(err))
  }
})

popupFormDelete.setEventListeners()


const avatarPopupForm = new PopupWithForm('.popup_avatar', (data) => {
  avatarPopupForm.renderSaveLoading(true)
  api.changeAvatar({
    avatar: data[avatarInput.name]
  })
  .then(() => {
    const avatarImage = {avatar: avatarInput.value}
    userInfo.setNewAvatar(avatarImage)
    avatarPopupForm.close()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    avatarPopupForm.renderSaveLoading(false);
  });
}) 

avatarPopupForm.setEventListeners()
 

openAddMenuButton.addEventListener('click', function () {
  addPopupForm.open()
  validationPopupMesto.disableSubmitButton()
})