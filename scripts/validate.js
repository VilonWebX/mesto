const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    disabledButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
  }
    
    const showInputError = (form, input, config) => {
        input.classList.add(config.inputErrorClass)
        const span = form.querySelector(`.${input.id}-error`)
        span.textContent = input.validationMessage
        span.classList.add(config.errorClass)
    } 
    const hideInputError = (form, input, config) => {
        input.classList.remove(config.inputErrorClass)
        const span = form.querySelector(`.${input.id}-error`)
        span.textContent = ' '
        span.classList.remove(config.errorClass)
    }

    const isValid = (form, input, config) => {
        if (!input.validity.valid) {
            showInputError(form, input, config)
        }
        else {
            hideInputError(form, input, config)
        }
    }
    
    const hasInvalidValue = (inputs) => {
        return inputs.some(input => !input.validity.valid)
    }

//---------------tert------
    const enableSubmitButton = (config, button) => {
        button.classList.remove(config.disabledButtonClass)
        button.disabled = false
    }

    const disabledSubmitButton = (config, button) => {
        button.classList.add(config.disabledButtonClass)
        button.disabled = true
    }
//-------------
    const toggleButtonState = (inputs, button, config) => {
        if (hasInvalidValue(inputs)) {
            disabledSubmitButton(config, button)
        } 
        else {
            enableSubmitButton(config, button)
        }
    }

    const setEventListeners = (form, config) => {
     const inputs = Array.from(form.querySelectorAll(config.inputSelector))
     const button = form.querySelector(config.submitButtonSelector)

     toggleButtonState(inputs, button, config)
     inputs.forEach(input => {
        input.addEventListener('input', () => {
        isValid(form, input, config)
        toggleButtonState(inputs, button, config)
        })
     })
    }
    function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector))
    forms.forEach((form) => {
        setEventListeners(form, config)
    })
    }
enableValidation(config)
//-------------------------------popopoopoppopopo----