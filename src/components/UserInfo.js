export default class UserInfo {

  #nameSelector;
  #jobSelector;
  #profileObject;
  #avatarSelector;
  #id;
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this.#nameSelector = document.querySelector(nameSelector);
    this.#jobSelector = document.querySelector(jobSelector);
    this.#avatarSelector = document.querySelector(avatarSelector);
  }

  /**
   * метод позволяет получать актуальные данные пользователя, в том числе для заполнения инпутов.
   * @returns объект с данными пользователя
   */
  getUserInfo() {
    this.#profileObject = { };
    this.#profileObject.name = this.#nameSelector.textContent;
    this.#profileObject.about = this.#jobSelector.textContent;
    return this.#profileObject;
  }

  /**
   * публичный метод принимает новые данные пользователя и добавляет их на страницу
   * @param {*} formData объект в свойствах которого данные для профиля
   */
  setUserInfo(formData) {
    this.#nameSelector.textContent = formData.name;
    this.#jobSelector.textContent = formData.about;
    this.#avatarSelector.src = formData.avatar;
  }

  setUserId(formData) {
    return formData._id;
  }

  getUserId() {
    return this._id;
  }

  setUserAvatar(avatarData) {
    this.#avatarSelector.src = avatarData.avatar;
    console.log(avatarData.avatar)
  }
}
