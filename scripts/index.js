const profileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let pforileJob = document.querySelector('.pforile__caption');

function togglePopup() {
    popupProfile.classList.toggle('popup__opened')
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    pforileJob.textContent = jobInput.value;
    togglePopup()
}

formElement.addEventListener('submit', handleFormSubmit);

profileButton.addEventListener('click', togglePopup);
popupCloseProfile.addEventListener('click', togglePopup);








