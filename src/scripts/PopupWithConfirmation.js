import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._submitFormFunction = submitFormFunction;
        this._deleteButton = this._popup.querySelector(".popup__delete");
    }

    open = ({card, cardId}) => {
        super.open();
        this._element = card
        this._cardId = cardId; 
      };

      deleteCard() {
        this._submitFormFunction({ cardId: this._cardId });
      }

    renderLoading(isLoading) {
        if (isLoading) {
            this._deleteButton.textContent = "Удаление...";
        } else {
            this._deleteButton.textContent = "Удалить";
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