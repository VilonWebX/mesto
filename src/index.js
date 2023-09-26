import './pages/index.css';
import {
  editFormElement,
  addFormElement,
  avatarFormElement,
  openEditPopupBtn,
  openAddPopupBtn,
  openAvatarPopupBtn,
  validationConfig,
  profileInfoConfig,
} from './scripts/utils/contants.js';
import Card from './scripts/Card.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithConfirmation from './scripts/PopupWithConfirmation.js';
import Api from './scripts/Api.js';

//================================================================================
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '6eb95615-41bc-4a8d-9ae0-0a0f51b44964',
    'Content-Type': 'application/json'
  }
});

//данные пользователя
const userInfo = new UserInfo(profileInfoConfig);

// попап с открытой карточкой
const popupWithImage = new PopupWithImage('.popup-image');



// создание карточки
function createCard (element) {
  const card = new Card(element, popupWithImage.open,
    popupDeleteCard.open, (like, cardId) => {
    if (card.handleCardLikeFunction(like)) {
      api.deleteLike(cardId)
        .then(res => {card.toggleLike(res.likes)})
        .catch(err => console.log(`Что-то пошло не так: ${err}`))
    } else {
      api.addLike(cardId)
        .then(res => {card.toggleLike(res.likes)})
        .catch(err => console.log(`Что-то пошло не так: ${err}`))
    }
  });
  return card.createCard();
  }
  

  const popupDeleteCard = new PopupWithConfirmation('.popup_ques', ({ card, cardId }) => {
    popupDeleteCard.renderLoading(true, "Удаление...");
    api.deleteCard(cardId)
        .then(() => {
          card.removeCard()
          popupDeleteCard.close();
        })
        .catch(err => console.log(`Что-то пошло не так: ${err}`))
        .finally(() => popupDeleteCard.renderLoading(false))
      }
  );


// отрисовка карточек
const section =  new Section((element) => {
  section.addNewItem(createCard(element));
}, '.element-container');

// addpopup
const addPopup = new PopupWithForm('.popup_type_mesto', (data) => {
  addPopup.renderLoading(true, 'Загрузка...');
  api.addNewCard(data)
    .then((res) => {
      res.myId = res.owner._id;
      section.addNewItem(createCard(res));
      addPopup.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => addPopup.renderLoading(false));
});

const avatarPopup = new PopupWithForm('.popup_avatar', (data) => {
  avatarPopup.renderLoading(true, 'Сохранение...');
  api.editAvatar(data)
  .then(res => { 
    userInfo.setAvatar({ 
      avatar: res.avatar
    });
      avatarPopup.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => avatarPopup.renderLoading(false));
});

const editPopup = new PopupWithForm('.popup_type_profile', (data) => {
  editPopup.renderLoading(true, 'Сохранение...');
  api.editProfileInfo(data)
    .then(res => { 
      userInfo.setUserInfo({ 
        username: res.name, 
        job: res.about,  
      });
      editPopup.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => editPopup.renderLoading(false))
    })


editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();

// валидация
const editFormValidator = new FormValidator(editFormElement, validationConfig);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(addFormElement, validationConfig);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(avatarFormElement, validationConfig);
avatarFormValidator.enableValidation();

// слушатели
openEditPopupBtn.addEventListener('click', function() {
  editFormValidator.resetInputForm();
  editPopup.setInputValues(userInfo.getUserInfo());
  editPopup.open();
});

openAvatarPopupBtn.addEventListener('click', function() {
  avatarFormValidator.resetInputForm();
  avatarPopup.open();
});

openAddPopupBtn.addEventListener('click', function() {
  addFormValidator.resetInputForm();
  addPopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([resDataUser, resDataCard]) => {
      resDataCard.forEach(element => element.myId = resDataUser._id)

    userInfo.setUserInfo({ 
      username: resDataUser.name, 
      job: resDataUser.about, 
    });
  
    userInfo.setAvatar({
      avatar: resDataUser.avatar
    });
  
    section.renderItems(resDataCard);
  })
  .catch(err => console.log(`Ошибка при запросе к серверу: ${err}`))