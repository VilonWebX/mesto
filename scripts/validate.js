
function enableValidation(config) {
    const showInputError = (form, input) => {
        input.classList.add(config.inputErrorClass)
        const span = form.querySelector(`.${input.id}-error`)
        span.textContent = input.validationMessage
        span.classList.add(config.errorClass)
    } 
    const hideInputError = (form, input) => {
        input.classList.remove(config.inputErrorClass)
        const span = form.querySelector(`.${input.id}-error`)
        span.textContent = ' '
        span.classList.remove(config.errorClass)
    }

    const isValid = (form, input) => {
        if (!input.validity.valid) {
            showInputError(form, input)
        }
        else {
            hideInputError(form, input)
        }
    }

    const setEventListeners = (form) => {
     const inputs = Array.from(form.querySelectorAll(config.inputSelector))
     const button = form.querySelector(config.submitButtonSelector)

     inputs.forEach((input) => {
        input.addEventListener('input', () => {
        isValid(form, input)
        })
     })
    }
    const forms = Array.from(document.querySelectorAll(config.formSelector))
    forms.forEach((form) => {
        setEventListeners(form)
    })
}
