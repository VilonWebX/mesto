import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popup.querySelector('.popup-image__photo')
        this._nameCard = this._popup.querySelector('.popup-image__text')
    }
    open(image) {
        super.open()
        this._image.src = image.link
        this._image.alt = image.name
        this._nameCard.textContent = image.name
    }
}
