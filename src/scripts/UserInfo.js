export default class UserInfo {
    constructor({userName, userDescription}) {
        this._name = document.querySelector(userName)
        this._description = document.querySelector(userDescription)
    }
    setUserInfo({name, description}) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
    getUserInfo() {
        return {
          name: this._name.textContent,
          description: this._description.textContent
        }
      }
}
