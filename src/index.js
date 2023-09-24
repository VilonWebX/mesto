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

const popupOpenEdit = document.querySelector('.profile__edit-button')
const openAddMenuButton = document.querySelector('.profile__add-button')
const formElementMesto = document.querySelector('.popup__form_type_mesto');
const namedInput = formElementMesto.querySelector('.popup__input_type_named');
const linkInput = formElementMesto.querySelector('.popup__input_type_link');

const formAvatar = document.querySelector('.popup__form_type_avatar')
const avatarInput = document.querySelector('.popup__input_type_avatar')

let userCurrentId
const popupOpenAvatar = document.querySelector('.profile__avatar')
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


const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    'Content-Type': "application/json",
    'authorization': '6eb95615-41bc-4a8d-9ae0-0a0f51b44964'
  }
}
const api = new Api(apiConfig);
// Получить ответ 
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([resUser, resCard]) => {
    userCurrentId = resUser._id;
    userInfo.setNewAvatar(resUser);
    userInfo.setUserInfo(resUser);
    cardsContainer.renderItems(resCard, userCurrentId)
  })
  .catch((err) => alert(err))


// Создание Popup изображения 
const cardImagePopup = new PopupWithImage('.popup-image');


// Функция создания карточки 
const createCard = (data, user) => {
  const card = new Card({
    data: data, userId: user, templateSelector: '#template-elements',
    handleCardClick: () => {
      cardImagePopup.open(data);
    },
    handleCardDelete: (cardID, cardElement) => {
      popupFormDelete.open(cardID, cardElement);
    },
    handleCardLike: (cardId) => {
      api.putLike(cardId)
        .then((res) => {
          card.renderCardLike(res);
        })
        .catch((err) => alert(err))
    },
    handleCardDeleteLike: (cardId) => {
      api.deleteCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res)
        })
        .catch((err) => alert(err))
    }
  })
  return card.generateCard();
}
// Функция создания секции 
const cardsContainer = new Section({
  renderer: (item, userID) => {
    cardsContainer.addItem(createCard(item, userID))
  },
}, '.element-container')

// Popup добавления и редактирования------------------------------------------------------


//Получение формы профиля 
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar'
})

// Функция создания Popup редактировапния профиля
const popupFormProfile = new PopupWithForm('.popup_type_profile', {
  submitCallback: (data) => {
    popupFormProfile.renderPreloader(true, "Загрузка..")
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.setUserInfo(res)
        popupFormProfile.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupFormProfile.renderPreloader(false)
      })
  }
})
// Функция открытия Popup добавления карточки 
popupOpenEdit.addEventListener('click', () => {
  popupFormProfile.open()
  popupFormProfile.setInputValues(userInfo.getUserInfo())
})

// Функция создания Popup добавления карточки 
const  popupFormAddCards = new PopupWithForm('.popup_type_mesto', {
  submitCallback: (data) => {
    popupFormAddCards.renderPreloader(true, 'Сохранение..')
    api.addNewCard(data)
    .then((newCard) => {
      cardsContainer.prependItem(createCard(newCard, userCurrentId))
      popupFormAddCards.close()
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAddCards.renderPreloader(false)
    })
  }
})

//Функция создания Popup редактирования аватара
const popupFormAvatar = new PopupWithForm('.popup_avatar', {
  submitCallback: (data) => {
    popupFormAvatar.renderPreloader(true, 'Загрузка...')
    api.setUserAvatar(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser)
      popupFormAvatar.close()
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAvatar.renderPreloader(false)
    })
  }
})
// Функция открытия Popup аватара 
popupOpenAvatar.addEventListener('click', () => {
  popupFormAvatar.open()
})

// Функция создания Popup подтверждения удаления 
const popupFormDelete = new PopupDelete('.popup_ques', {
  submitCallback: (id, card) => {
    popupFormDelete.renderPreloader(true, 'Удаление..')
    api.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupFormDelete.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormDelete.renderPreloader(false)
    })
  }
})

// Функция валидации 

// Вызов функции валидации 
validationPopupProfile.enableValidation()
validationPopupMesto.enableValidation()
validationAvatar.enableValidation()
// Слушатели 
cardImagePopup.setEventListeners()
popupFormProfile.setEventListeners()
popupFormAddCards.setEventListeners()
popupFormAvatar.setEventListeners()
popupFormDelete.setEventListeners()
