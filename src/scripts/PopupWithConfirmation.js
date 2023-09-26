import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._submitFormFunction = submitFormFunction;
        this._deleteButton = this._popup.querySelector(".popup__delete");
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitButton = this._formElement.querySelector('.popup__save');
    }

    open = ({card, cardId}) => {
        super.open();
        this._element = card
        this._cardId = cardId; 
      };

      deleteCard() {
        this._submitFormFunction({ cardId: this._cardId });
      }

      renderLoading(loading, displayText) {
        if (!this._submitButton) return;
        if (loading) {
          this.defaulText = this._submitButton.textContent;
          this._submitButton.textContent = displayText;
        } else {
          this._submitButton.textContent = this.defaulText;
        }
      }
    

    setEventListeners() {
        super.setEventListeners();
        this._deleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitFormFunction({ card: this._element, cardId: this._cardId });
          });
    }
}