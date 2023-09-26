export default class UserInfo {
  constructor(config) {
    this._profileName = document.querySelector(config.profileNameSelector);
    this._profileJob = document.querySelector(config.profileJobSelector);
    this._profileAvatar = document.querySelector(config.profileAvatarSelector);
  }

  // отображает данные пользователя при открытии popup
  getUserInfo() {
    return {
      username: this._profileName.textContent,
      job: this._profileJob.textContent
    }};

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ username, job}) {
    this._profileName.textContent = username;
    this._profileJob.textContent = job;
  };

  setAvatar({avatar}) {
    this._profileAvatar.src = avatar;
  }
}