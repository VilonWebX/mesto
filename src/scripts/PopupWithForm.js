import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form')
        this._submitForm = submitForm
        this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'))
    }
    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
        })
        return values
    }
    setEventListeners() {
        super.setEventListeners() 
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
        })
    }
    close() {
        super.close()
        this._form.reset()
    }
}