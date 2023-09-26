import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-image__photo');
    this._popupCaption = this._popup.querySelector('.popup-image__text');
  }
  
  open = (cardData) => {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = cardData.title;
    this._popupCaption.textContent = cardData.title;
    super.open();
  }
}