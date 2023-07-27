const profileButton = document.querySelector('.profile__edit-button'); //РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close_type_profile');
let formElement = document.querySelector('.popup__form_type_profile');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function togglePopupProfile() {
  popupProfile.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopupProfile()
}

formElement.addEventListener('submit', handleFormSubmit);

profileButton.addEventListener('click', togglePopupProfile);
popupCloseProfile.addEventListener('click', togglePopupProfile);


//РЕДАКТИРВОАНИЕ МЕСТА----------------------------------------------------------------------------------------------------------------------------->
const profileAddButton = document.querySelector('.profile__add-button');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupCloseMesto = popupMesto.querySelector('.popup__close_type_mesto');
let formMesto = document.querySelector('.popup__form_type_mesto');
let namedInput = formMesto.querySelector('.popup__input_type_named');
let linkInput = formMesto.querySelector('.popup__input_type_link');

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

const elements = document.querySelector('.elements');
const elementTemplate = elements.querySelector('.element__template').content;
const li = elementTemplate.querySelector('.element');
const elementImage = li.querySelector('.elements__image');
const elementText = li.querySelector('.elements__text');



//ИЗНАЧАЛЬНЫЙ РЕНДЕР КАРТОЧЕК---------------------------------------------------------------------------------------------------------------------->
function handleAddCards(evt) {
  evt.preventDefault()
  let namedValue = namedInput.value
  let linkValue = linkInput.value

  elementText.textContent = namedValue;
  elementImage.textContent = linkValue;

  renderCard(namedValue, linkValue)
  togglePopupMesto() 
}
formMesto.addEventListener('submit', handleAddCards)


const createCard = (name, link) => {
  const li = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = li.querySelector('.elements__image').src = link;
  const elementText = li.querySelector('.elements__text').textContent = name;

  elementImage.alt = `Фотография ${elementText.textContent}`

  //окрашивание лайков
  li.querySelector('.elements__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button_active')
  })

  //удаление карточек
  const elementDelete = li.querySelector('.elements__delete');
  elementDelete.addEventListener('click', () => li.remove())

  return li
}

const renderCard = (name, link) => {
  const newCard = createCard(name, link)
  elements.prepend(newCard);
}

//разбирает массив по каждому параметру
initialCards.forEach((element) => {
  const newCard = createCard(element.name, element.link)
  elements.append(newCard)
})

//попап просмотра фотографий -------------------------------------------------------------------------------------------------------------------->
let popupImage = document.querySelector('.popup-image');
let popupImageButton = document.querySelector('.popup-image__button');
let popupImageOpen = document.querySelector('.elements__image')

function openPopupImage() {
  popupImage.classList.add('popup_opened')
}
function closePopupImage() {
  popupImage.classList.remove('popup_opened')
} 

popupImageOpen.addEventListener('click', () => {
  openPopupImage(popupImage)
})

popupImageOpen.addEventListener('click', openPopupImage)
popupImageButton.addEventListener('click', closePopupImage)
















