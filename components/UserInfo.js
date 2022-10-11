import {
  nameInput,
  jobInput,
} from "../utils/constants.js";

export default class UserInfo {

  #nameSelector;
  #jobSelector;

  constructor({ nameSelector, jobSelector }) {
    this.#nameSelector = document.querySelector(nameSelector);
    this.#jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    nameInput.value = this.#nameSelector.textContent;
    jobInput.value = this.#jobSelector.textContent;
  }

  setUserInfo(formData) {
    this.#nameSelector.textContent = formData.username;
    this.#jobSelector.textContent = formData.userjob;
  }
}
