import {openPopup} from './initial-cards.js'

export default class Card {
    constructor({ name, link }, templateSelector) {
        this._name = name
        this._link = link 
        this._templateSelector = templateSelector
        this._newCard = this._getTemplate()
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
        const imageElement = this._newCard.querySelector('.elements__image')
        imageElement.src = this._link
    }
    _removeCard() {
        this._newCard.remove()
        this._newCard = null;
    }
    _toggleLike(evt) {
        evt.target.classList.toggle('elements__button_active')
    }
    _openImage() {
        const popupImage = document.querySelector('.popup-image')
        const imagePhoto = document.querySelector('.popup-image__photo')
        const textImage = document.querySelector('.popup-image__text')
        imagePhoto.src = this._link
        imagePhoto.alt = this._name
        textImage.textContent = this._name
        openPopup(popupImage) 
    }
    _setListeners() {
        this._newCard.querySelector('.elements__button').addEventListener('click', this._toggleLike)
        this._newCard.querySelector('.elements__delete').addEventListener('click', () => {
            this._removeCard()
        })
        this._newCard.querySelector('.elements__image').addEventListener('click', () => {
            this._openImage()
        })
    }
    getView() {
        this._newCard = this._getTemplate()
        this._setData()
        this._setListeners()
        return this._newCard
    }
}

