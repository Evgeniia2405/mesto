export default class UserInfo {

  #nameSelector;
  #jobSelector;
  #profileObject;
  constructor({ nameSelector, jobSelector }) {
    this.#nameSelector = document.querySelector(nameSelector);
    this.#jobSelector = document.querySelector(jobSelector);
  }

  /**
   * метод позволяет получать актуальные данные пользователя, в том числе для заполнения инпутов.
   * @returns объект с данными пользователя
   */
  getUserInfo() {
    this.#profileObject = { };
    this.#profileObject.username = this.#nameSelector.textContent;
    this.#profileObject.userjob = this.#jobSelector.textContent;
    return this.#profileObject;
  }

  /**
   * публичный метод принимает новые данные пользователя и добавляет их на страницу
   * @param {*} formData объект в свойствах которого данные для профиля
   */
  setUserInfo(formData) {
    this.#nameSelector.textContent = formData.username;
    this.#jobSelector.textContent = formData.userjob;
  }
}
