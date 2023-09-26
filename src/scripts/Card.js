export default class Card {
  constructor(cardData, openImagePopup, openDeletePopup, handleCardLike) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._myId = cardData.myId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._numberOfLikes = cardData.likes.length;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._handleCardLike = handleCardLike;
    this._templateElement = document.getElementById('template-elements')
    .content
    .querySelector('.element')
    .cloneNode(true);
    this._cardImage = this._templateElement.querySelector('.elements__image');
    this._cardTitle = this._templateElement.querySelector('.elements__text');
    this._addLikeBtn = this._templateElement.querySelector('.elements__button');
    this._deleteCardButton = this._templateElement.querySelector('.elements__delete');
    this._counter = this._templateElement.querySelector('.elements__span');
    this._setEventListeners();
  }
  _openImage = () => {
    this._openImagePopup({ title: this._name, link: this._link });
  }

    _openDelete = () => {
    this._openDeletePopup({card: this, cardId: this._cardId } );
  }

  _addLike = () => {
    this._handleCardLike(this._addLikeBtn, this._cardId);
  }
  handleCardLikeFunction(like) {
    return like.classList.contains('elements__button_active')
  }
  _countLikes = () => {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._addLikeBtn.classList.add('elements__button_active');
        return
      }
    });
    this._counter.textContent = this._numberOfLikes;
  }
  toggleLike = (dataLikes) => {
    this._addLikeBtn.classList.toggle('elements__button_active');
    this._counter.textContent = dataLikes.length;
  }

  _setEventListeners = () => {
    this._addLikeBtn.addEventListener('click', this._addLike);
    this._deleteCardButton.addEventListener("click", this._openDelete);
    this._cardImage.addEventListener('click', this._openImage);
  }

  removeCard = () => {
    this._templateElement.remove();
    this._templateElement = null;
  }

  createCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._counter.textContent = this._numberOfLikes;
    this._countLikes();
    if (this._myId !== this._ownerId) {
      this._deleteCardButton.remove();
    }
    return this._templateElement;
  }
}


  // _openDelete = () => {
  //   console.log(this);
  //   this._openDeletePopup({ card: this, cardId: this._cardId });
  // }