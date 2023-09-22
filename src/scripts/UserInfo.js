export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._name = document.querySelector(userNameSelector)
        this._description = document.querySelector(userDescriptionSelector)
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
