export default class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector, profileAvatarSelector }) {
        this._name = document.querySelector(userNameSelector)
        this._description = document.querySelector(userDescriptionSelector)
        this._avatar = document.querySelector(profileAvatarSelector);
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
    setNewAvatar({ url }) {
      this._avatar.src = url.avatar;
    }
}
