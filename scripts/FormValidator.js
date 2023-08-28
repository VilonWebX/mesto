class FormValidator {
    constructor(form, config) {
        this._form = form
        this._config = config
        this._input = config.inputSelector
        this._submitButton = config.submitButtonSelector
        this._disabledButton = config.disabledButtonClass
        this._error = config.errorClass
        this._inputError = config.inputErrorClass
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
        this._submitButtonSelector = this._form.querySelector(this._config.submitButtonSelector)
    }
    _showInputError(inputElement) {
        inputElement.classList.add(this._inputError)
        const span = this._form.querySelector(`.${inputElement.id}-error`)
        span.textContent = this._input.validationMessage
        inputElement.classList.add(this._error)
    }
    _hideInputError(inputElement) {
        inputElement.classList.remove(this._inputError)
        const span = this._form.querySelector(`.${inputElement.id}-error`)
        span.textContent = ''
        inputElement.classList.remove(this._error)
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
    disabledSubmitButton() { 
        this._submitButtonSelector.classList.add(this._config.disabledButtonClass)
        this._submitButtonSelector.disabled = true
    }
    enableSubmitButton() {
        this._submitButtonSelector.classList.remove(this._config.disabledButtonClass)
        this._submitButtonSelector.disabled = false
    }  
    _toggleButtonState() {
        if (this._hasInvalidValue()) {
            this.disabledSubmitButton()
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

