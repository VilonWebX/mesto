const profileButton = document.querySelector('.profile__edit-button'); //РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close_type_profile');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function openPopupProfile(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
} 

function closePopupProfile(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupProfile(popupProfile)
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

profileButton.addEventListener('click', () => {
   openPopupProfile(popupProfile)});
popupCloseProfile.addEventListener('click', () => {
   closePopupProfile(popupProfile)});

//РЕДАКТИРВОАНИЕ МЕСТА----------------------------------------------------------------------------------------------------------------------------->
const profileAddButton = document.querySelector('.profile__add-button');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupCloseMesto = popupMesto.querySelector('.popup__close_type_mesto');
let formElementMesto = document.querySelector('.popup__form_type_mesto');
let namedInput = formElementMesto.querySelector('.popup__input_type_named');
let linkInput = formElementMesto.querySelector('.popup__input_type_link');

//Открытие и закрытие попапа места
function togglePopupMesto() {
  popupMesto.classList.toggle('popup_opened');
}

profileAddButton.addEventListener('click', togglePopupMesto);
popupCloseMesto.addEventListener('click', togglePopupMesto);

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
 /////////////////////////////////////////////

//ИЗНАЧАЛЬНЫЙ РЕНДЕР КАРТОЧЕК---------------------------------------------------------------------------------------------------------------------->
function handleAddCards(evt) {
  evt.preventDefault()
  let namedValue = namedInput.value
  let linkValue = linkInput.value

  renderCard(namedValue, linkValue)
  togglePopupMesto() 
}
formElementMesto.addEventListener('submit', handleAddCards)


const createCard = (name, link) => {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  let elementImage = elementCard.querySelector('.elements__image')
  const elementText = elementCard.querySelector('.elements__text')
  let textImage = document.querySelector('.popup-image__text')
  let imagePhoto = document.querySelector('.popup-image__photo')
  
  elementImage.src = link
  elementImage.alt = name 
  elementText.textContent = name
  
  //окрашивание лайков
  elementCard.querySelector('.elements__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button_active')
  })
  
  //удаление карточек
  const elementDelete = elementCard.querySelector('.elements__delete');
  elementDelete.addEventListener('click', () => elementCard.remove())

  function OpenImage() {
    textImage.textContent = elementText.textContent
    imagePhoto.src = elementImage.src
  }
  
  elementImage.addEventListener('click', () =>  {
    openPopupImage(popupImage)}) 
  
  elementImage.addEventListener('click', OpenImage)
  
  return elementCard
}

const renderCard = (name, link) => {
  const newCard = createCard(name, link)
  cardsContainer.prepend(newCard);
}

//разбирает массив по каждому параметру
initialCards.forEach((element) => {
  const newCard = createCard(element.name, element.link)
  cardsContainer.append(newCard)
})

let popupImageOpen = document.querySelector('.elements__image');
const popupImageButton = document.querySelector('.popup-image__button')
let popupImage = document.querySelector('.popup-image')

function openPopupImage(popup) {
  popup.classList.add('popup_opened')
}

function closePopupImage(popup) {
  popup.classList.remove('popup_opened')
} 
popupImageButton.addEventListener('click', () => { 
  closePopupImage(popupImage)})   //---------------------------------------------------------------------------------------------------------------------------------------------------->