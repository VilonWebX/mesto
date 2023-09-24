export default class Api {
  constructor(config) {
    this._headers = config.headers
    this._url = config.url
    this._authorization = config.headers['authorization'];
  } 
  //Проверка на ошибки
  _ifCheck(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Запрос данных с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      },
    })
    .then(res => this._ifCheck(res))
  }
  //Функция добавления новой карточки на сервер
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(res => this._ifCheck(res))
  }
  //Функция получения данных пользователя с сервера
  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      },
    })
    .then(res => this._ifCheck(res))
  }
  //Функция передачи данных пользователя с сервера 
  setUserInfoApi(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(res => this._ifCheck(res))
  }
  //Функция передачи на сервер нового аватара
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(res => this._ifCheck(res))
  }

  //*Функция отправки лайка на сервер
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._ifCheck(res))
  }
  //Функция удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._ifCheck(res))
  }
  //Функция удаления лайка с сервера
  deleteCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }
}