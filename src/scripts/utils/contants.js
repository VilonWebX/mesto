const validationConfig = {
    allforms: document.forms,
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    disabledButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
  }
  const profileInfoConfig = {
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__job',
    profileAvatarSelector: '.profile__avatar'
  }

  
const avatarFormElement = document.forms['avatar-form'];
const editFormElement = document.forms['edit-form'];
const addFormElement = document.forms['add-form'];
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const openAddPopupBtn = document.querySelector('.profile__add-button');
const openAvatarPopupBtn = document.querySelector('.profile__image');
const groupsContainer = document.querySelector('.element-container');

export {
    avatarFormElement,
    editFormElement,
    addFormElement,
    openEditPopupBtn,
    openAddPopupBtn,
    openAvatarPopupBtn,
    validationConfig,
    profileInfoConfig,
    groupsContainer,
    // templateSelector,
};
