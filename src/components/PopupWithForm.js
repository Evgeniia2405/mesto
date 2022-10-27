/**
 * Класс PopupWithForm наследует от Popup
 */
import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  #popup;
  #inputList;
  #formValues;
  #formPopup;
  #handleFormSubmit;
  #buttonPopup;

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#formPopup = this.#popup.querySelector('.popup__form');
    this.#buttonPopup = this.#popup.querySelector('.popup__button');
    this.#inputList = this.#popup.querySelectorAll('.popup__input');
    this.#handleFormSubmit = handleFormSubmit;
  }

  /**
   * публичный метод для получения актуального элемента формы
   * @returns DOM-элемент формы
   */
  getFormPopup() {
    return this.#formPopup;
  }

  /**
   * приватгый метод собирает данные всех полей формы.
   * @returns объект в свойства которого записываются значения полей input
   */
  #getInputValues() {
    this.#formValues = {};
    this.#inputList.forEach(input => this.#formValues[input.name] = input.value);
    return this.#formValues;
  }

  /**
   * публичный метод устанавливает значения в поля формы, данные берутся из объекта
   * @param {*} inputObject в объекте свойства для полей input
   */
  setInputValues(inputObject) {
    this.#inputList.forEach(input => input.value = inputObject[input.name]);
  }


  /**
   * публичный метод добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
   */
  setEventListeners() {
    super.setEventListeners();

    this.#formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this.renderLoading(false);
      this.#handleFormSubmit(this.#getInputValues());
      this.closePopup();
    });
  }

  /**
   * метод для закрытия попапа и сброса форма.
   */
  closePopup() {
    this.#formPopup.reset();
    super.closePopup()
  }

  /**
   * метод для уведомления пользователя о процессе загрузки.
   */
  renderLoading(isLoading) {
    if (isLoading) {
      this.#buttonPopup.textContent = 'Сохранение...';
    }
    else {
      this.#buttonPopup.textContent = 'Сохранить'
    }
  }
}

