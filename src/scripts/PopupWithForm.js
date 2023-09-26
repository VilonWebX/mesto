import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitFormFunction = submitFormFunction;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList  = Array.from(this._popup.querySelectorAll('.popup__input'))
    this._submitButton = this._formElement.querySelector('.popup__save');
  }

  //собирает данные всех полей формы
  _getInputValues() {
    const values = {}
    this._inputList.forEach((input) => {
        values[input.name] = input.value
    })
    return values
  }

 //заполняет инпут полученными данными 
  setInputValues(configInfo) {
    this._inputList.forEach(input => {
      input.value = configInfo[input.name];
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.value = "Сохранение...";
    } else {
      this._submitButton.value = "Сохранить";
    }
}

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this._getInputValues());
    }
  )}

  close() {
    super.close();
    this._formElement.reset();
  }
}