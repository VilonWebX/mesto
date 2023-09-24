import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(popupSelector,  { submitCallback }) {
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
        this._button = this._form.querySelector('.popup__save')
    }
    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
        })
        return values
    }
    setInputValues = (data) => {
      this._inputs.forEach((input, i) => {
        input.value = Object.values(data)[i];
      });
    }
  
    close() {
        this._form.reset()
        super.close()
    }
    renderPreloader(loading, Text) {
      if (!this._button) return;
      if (loading) {
        this.defaulText = this._button.textContent;
        this._button.textContent = Text;
      } else {
        this._button.textContent = this.defaulText;
      }
    }
    renderSaveLoading(isLoading) {
        if(isLoading) {
          this._button.textContent = 'Сохранение...';
        } else {
          this._button.textContent = 'Сохранить';
        }
    }
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
      })
    }
}