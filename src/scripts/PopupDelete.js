import Popup from "./Popup";
export default class PopupDelete extends Popup {
    constructor(popupSelector, {submitCallback} ) {
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._button = this._popup.querySelector('.popup__save')
    }
    open(cardElement, idCard) {
        super.open()
        this.id = idCard;
        this.card = cardElement;
    }
    renderPreloader(loading, Text) {
      if (!this._button) return;
      if (loading) {
        this.defaulText = this._button.textContent;
        this._button.textContent = Text;
      } else {
        this._button.textContent = this.defaulText;
      }
    }
    setEventListeners() {
      super.setEventListeners();
      this._button.addEventListener('click', () => {
        this._submitCallback(this.id, this.card);
      })
    }
}