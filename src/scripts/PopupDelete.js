import Popup from "./Popup";
export default class PopupDelete extends Popup {
    constructor(popupSelector, {submitCallback} ) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
        this._buttonSubmit = this._popup.querySelector('.popup__save')
    }
    open(cardElement, idCard) {
        super.open()
        this.id = idCard;
        this.card = cardElement;
    }
    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', () => {
          this._submitCallback(this.id, this.card);
        })
      }
}