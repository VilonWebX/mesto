class FormValidator {
    constructor(form, config) {
        this._form = form
        this._config = config
        this._inputSelector = this._config.inputSelector
        this._submitButtonSelector = this._config.submitButtonSelector
        this._disabledButtonClass = this._config.disabledButtonClass
        this._errorClass = this._config.errorClass
        this._inputErrorClass = this._config.inputErrorClass
        this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
        this._saveButton = this._form.querySelector(this._submitButtonSelector)
    }
    _showInputError(inputElement) {
        inputElement.classList.add(this._inputErrorClass)
        const span = this._form.querySelector(`.${inputElement.id}-error`)
        span.textContent = inputElement.validationMessage
        inputElement.classList.add(this._errorClass)
    }
    _hideInputError(inputElement) {
        inputElement.classList.remove(this._inputErrorClass)
        const span = this._form.querySelector(`.${inputElement.id}-error`)
        span.textContent = ''
        inputElement.classList.remove(this._errorClass)
    }
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement)
        }
    }
    _hasInvalidValue() {
        return this._inputs.some(inputElement => !inputElement.validity.valid)
    }
    disableSubmitButton() { 
        this._saveButton.classList.add(this._disabledButtonClass)
        this._saveButton.disabled = true
        return this._saveButton
    }
    enableSubmitButton() {
        this._saveButton.classList.remove(this._disabledButtonClass)
        this._saveButton.disabled = false
    }  
    _toggleButtonState() {
        if (this._hasInvalidValue()) {
            this.disableSubmitButton()
        } else {
            this.enableSubmitButton()
        }
    }
    _setEventListeners() {
        this._toggleButtonState()
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)
                this._toggleButtonState()
            })
        })
    }
    enableValidation() {
        this._setEventListeners()
    }
}

export default FormValidator


