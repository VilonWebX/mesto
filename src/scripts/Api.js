export default class Api { 
  constructor(options){
      this._baseUrl = options.baseUrl;
      this._headers =  options.headers;
      this._authorization = options.headers.authorization;
  }

  //запрос к серверу
  _checkResponse(res) {
      if(res.ok) {
          return res.json();
      }
      return Promise.reject(`Что-то пошло не так. Ошибка checkResponse: ${res.status}`);
  }

  //загрузка информации о пользователе с сервера
  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: { authorization: this._authorization },
      })
        .then(this._checkResponse)
       
    }

  //загрузка карточек с сервера
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {authorization: this._authorization}
      })
        .then(this._checkResponse)
      }

  //редактирование профиля
  editProfileInfo(dataUser) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: dataUser.username,
          about: dataUser.job,
        })
      })
      .then(this._checkResponse);
    }

        //обновление аватара
  editAvatar(dataUser) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
          avatar: dataUser.avatar,
      })
  })
      .then(this._checkResponse);
  }

  //добавление новой карточки
  addNewCard(dataCard) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: dataCard.name,
          link: dataCard.link,
        }),
      })
        .then(this._checkResponse);
    }

  //поставить лайк
  addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {authorization: this._authorization}
      })
      .then(this._checkResponse);
  }

  //удалить лайк
  deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {authorization: this._authorization}
      })
      .then(this._checkResponse)
  }

  //удалить карточку
  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
        .then(this._checkResponse)
  }
}

