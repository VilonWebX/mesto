import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popup.querySelector('.popup-image__photo')
        this._caption = this._popup.querySelector('.popup-image__text')
    }
    openImage(name, link) {
        this._image.src = link
        this._image.alt = name
        this._caption.textContent = name
        super.open()
    }
}