

export default class Card {
    constructor({ name, link }, templateSelector, handleOpenPopup) {
        this._name = name
        this._link = link 
        this._templateSelector = templateSelector
        this._newCard = this._getTemplate()
        this._handleOpenPopup = handleOpenPopup
    }
    _getTemplate() {
        const templateCard = document
        .querySelector(this._templateSelector).content
        .querySelector('.element')
        .cloneNode(true)
        this._newCard = templateCard
        return templateCard
    }
    _setData() {
        const textElement = this._newCard.querySelector('.elements__text')
        textElement.textContent = this._name
        this._imageElement = this._newCard.querySelector('.elements__image')
        this._imageElement.src = this._link
        this._imageElement.alt = `Фотография ${textElement.textContent}`
    }
    _removeCard() {
        this._newCard.remove()
        this._newCard = null;
    }
    _toggleLike(evt) {
        evt.target.classList.toggle('elements__button_active')
    }
    _setListeners() {
        this._newCard.querySelector('.elements__button').addEventListener('click', this._toggleLike)
        this._newCard.querySelector('.elements__delete').addEventListener('click', () => {
            this._removeCard()
        })
        this._imageElement = this._newCard.querySelector('.elements__image')
        this._imageElement.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._link)
        })
    }
    getView() {
        this._newCard = this._getTemplate()
        this._setData()
        this._setListeners()
        return this._newCard
    }
}

