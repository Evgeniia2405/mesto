import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  #popup;
  #inputList;
  #formValues;
  #formPopup;
  #handleFormSubmit;

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#formPopup = this.#popup.querySelector('.popup__form');
    this.#inputList = this.#popup.querySelectorAll('.popup__input');
    this.#handleFormSubmit = handleFormSubmit;
  }

  #getInputValues() {
    this.#formValues = {};
    this.#inputList.forEach(input => this.#formValues[input.name] = input.value);
    return this.#formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.#formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    this.#formPopup.reset();
    super.closePopup()
  }

}
