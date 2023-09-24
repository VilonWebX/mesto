export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    //открывает попап
    open() {
        this._popup.classList.add('popup_opened')
        window.addEventListener('keydown', this._handleEscClose)
    }
    //закрывает попап 
    close() {
        this._popup.classList.remove('popup_opened')
        window.removeEventListener('keydown', this._handleEscClose)
    }
    //закрытие попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close() 
        }
    }
    _handeClosePopupWithClickToZone(evt) {
        if(evt.target === this._popup) {
          this.close();
        }
      }
    //обьявляет слушатель клика иконке закрытия попапа
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
          });
        this._popup.addEventListener('click', this._handeClosePopupWithClickToZone.bind(this))
    }
}