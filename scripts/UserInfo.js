export default class UserInfo {
    constructor(userName, userDescription) {
        this._name = userName
        this._description = userDescription
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