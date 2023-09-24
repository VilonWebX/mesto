
export default class Card {
    constructor({data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardLike, handleCardDeleteLike}) {
        this._name = data.name
        this._link = data.link
        this._userId = userId
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._putLike = handleCardLike;
        this._removeLike = handleCardDeleteLike;
        this.idCard = data._id;
        this.cardData = data;
        this._dataLikes = data.likes;
        this._idUserCard = data.owner._id;
        this._likesCounter = data.likes.length;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true)
        return templateCard
    }
    generateCard() {
        this.cardElement = this._getTemplate();
        this._cardPhoto = this.cardElement.querySelector('.elements__image');
        this._cardTitle = this.cardElement.querySelector('.elements__text');
        this._cardLike = this.cardElement.querySelector('.elements__button');
        this._cardDel = this.cardElement.querySelector('.elements__delete');
        this._cardLikesCount = this.cardElement.querySelector('.elements__span');
    
        this._cardTitle.textContent = this._name;
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._name;
        this.renderCardLike(this.cardData);
        if (this._idUserCard !== this._userId) {
          this._cardDel.remove();
        }
        this._setEventListeners();
        return this.cardElement;
    }    
    likedCard() {
        return this._dataLikes.some(like => like._id === this._userId)
    };
    togleLike() {
        if (this.likedCard()) {
          this._removeLike(this.idCard);
        } else {
          this._putLike(this.idCard);
        }
    }
    renderCardLike(card) {
        this._dataLikes = card.likes;
      if(this._dataLikes.length === 0) {
        this._cardLikesCount.textContent = '0';
      } else {
        this._cardLikesCount.textContent = this._dataLikes.length
      }
      if (this.likedCard()) {
        this._cardLike.classList.add('.elements__button_active');
      } else {
        this._cardLike.classList.remove('.elements__button_active');
      }
    }

    deleteCard() {
        this.cardElement.remove();
        this.cardElement = null;
    }
    _setEventListeners() {
        this._cardLike.addEventListener('click', () => this.togleLike());
        this._cardDel.addEventListener('click', () => this._handleCardDelete(this, this.idCard));
        this._cardPhoto.addEventListener('click', () => this._handleCardClick());
    }
    
}

