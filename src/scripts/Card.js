
export default class Card {
    constructor(name, link, templateSelector, handleCardClick, handleCardDelete) {
        this._name = name
        this._link = link
        this._templateSelector = templateSelector
        this._newCard = this._getTemplate()
        this._handleCardClick = handleCardClick
        this._handleCardDelete = handleCardDelete
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
        const nameCard = this._newCard.querySelector('.elements__text')
        nameCard.textContent = this._name
    }
    _setImage() {
        this._imageCard.src = this._link;
        this._imageCard.alt = this._name;
    }
    _setDeleteEventListener() {
        if (this._isTrue) {
            this._deleteButton.addEventListener('click', this._handleDeleteCard.bind(this));
        } else {
            this._deleteButton.classList.add('elements__trash_hide');
        }
    }
    _setDeleteEventListener() {
        this._deleteButton.addEventListener('click', this._handleDeleteCard.bind(this));
    }
    _setLikeEventListener() {
        this._likeButton.addEventListener('click', this._handleLikeToCard.bind(this));
    }
    _setImageClickEventListener() {
        this._imageCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
    _handleDeleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }
    _handleLikeToCard() {
        this._likeButton.classList.toggle('elements__button_active');
    }
    getView() {
        this._newCard = this._getTemplate()
        this._imageCard = this._newCard.querySelector('.elements__image');
        this._deleteButton = this._newCard.querySelector('.elements__delete');
        this._likeButton = this._newCard.querySelector('.elements__button');

        this._setData();
        this._setImage()
        this._setDeleteEventListener()
        this._setLikeEventListener()
        this._setImageClickEventListener();

        return this._newCard
    }
}

