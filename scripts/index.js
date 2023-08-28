import Card from './Card.js'
import FormValidator from './FormValidator.js'
const profileButton = document.querySelector('.profile__edit-button'); //РЕДАКТИРОВАНИЕ ПРОФИЛЯ 
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close_type_profile');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


//------------------
//-------------- ---------- ----- 
const forms = Array.from(document.querySelectorAll('.popup__form'))
const popupList = Array.from(document.querySelectorAll('.popup'))
const pushEscClosePopup = (evt) => {
  if (evt.code === 'Escape') {
    popupList.forEach(popup => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    })
  }
}

const owelayClosePopup = (evt) => {
  popupList.forEach((popup) =>  {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', pushEscClosePopup)
  popup.addEventListener('click', owelayClosePopup)
  
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', pushEscClosePopup)
  popup.removeEventListener('click', owelayClosePopup)
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  
  closePopup(popupProfile)
  clearClosePopup(popupProfile)
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

profileButton.addEventListener('click',  () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile)
});
//------------------------------------------------------------------------------------------------------------------------------------------------

//РЕДАКТИРВОАНИЕ МЕСТА----------------------------------------------------------------------------------------------------------------------------->
const profileAddButton = document.querySelector('.profile__add-button');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupCloseMesto = popupMesto.querySelector('.popup__close_type_mesto');
const formElementMesto = document.querySelector('.popup__form_type_mesto');
const namedInput = formElementMesto.querySelector('.popup__input_type_named');
const linkInput = formElementMesto.querySelector('.popup__input_type_link');

//Открытие и закрытие попапа места

profileAddButton.addEventListener('click', () => {
  openPopup(popupMesto)
});
popupCloseMesto.addEventListener('click', () => {
  closePopup(popupMesto)
});

//массив попапа
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

const cardsContainer = document.querySelector('.elements');
const elementTemplate = cardsContainer.querySelector('.element__template').content; 
const elementCard = elementTemplate.querySelector('.element');

//ИЗНАЧАЛЬНЫЙ РЕНДЕР КАРТОЧЕК---------------------------------------------------------------------------------------------------------------------->
function handleAddCards(evt) {
  evt.preventDefault()
  //const namedValue = namedInput.value
  //const linkValue = linkInput.value
  const cardData = {name: namedInput.value, link: linkInput.value}
  renderCard(cardData)
  closePopup(popupMesto)
  const cardmesto = new FormValidator(formElementMesto, config)
  cardmesto.disabledSubmitButton()
  clearClosePopup(popupMesto)
} 
//------------------------------------------------------------------до этого
formElementMesto.addEventListener('submit', handleAddCards)
//==============   ====s s=======

const renderCard = (cardData) => {
  const cardElement = new Card(cardData, ".element__template")
  cardsContainer.prepend(cardElement.getView());
}

//разбирает массив по каждому параметру
initialCards.forEach((cardData) => {
  renderCard(cardData)
})

const popupImageOpen = document.querySelector('.elements__image');
const popupImageButton = document.querySelector('.popup-image__button')
const popupImage = document.querySelector('.popup-image')

popupImageButton.addEventListener('click', () => {
   closePopup(popupImage)
})   
//----------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const inputs = Array.from(document.querySelectorAll('.popup__input'));
const button = formElementMesto.querySelector('.popup__save')
//--------------------------------------------------------------------------------------------------------------------------------------------------
function clearClosePopup(popup) {
  const form = popup.querySelector(config.formSelector)
  if (popup.contains(form))  {
      forms.forEach((form) => {
          form.reset()
      })
  }
}
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
export {openPopup} 
