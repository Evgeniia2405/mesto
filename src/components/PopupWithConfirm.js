/**
 * Класс PopupWithForm наследует от Popup
 */
import Popup from '../components/Popup.js';

export default class PopupWithConfirm extends Popup {
  #popup;
  #formPopup;
  #handleFormSubmit;
  #buttonPopup;
  #initialText;
  #cardId;

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#formPopup = this.#popup.querySelector('.popup__form');
    this.#buttonPopup = this.#popup.querySelector('.popup__button');
    this.#handleFormSubmit = handleFormSubmit;
    this.#initialText = this.#buttonPopup.textContent;
  }

  openPopup(objectCard) {
    this.#cardId = objectCard._id;
    super.openPopup()
  }

  #getIdCard() {
    return this.#cardId
  }

  /**
   * публичный метод добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
   */
  setEventListeners() {
    super.setEventListeners();

    this.#formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#buttonPopup.textContent = 'Сохранение...';// меняем его, чтобы показать пользователю ожидание
      this.#handleFormSubmit(this.#getIdCard())
        .then(() => {
          this.closePopup();
        })
        .finally(() => {
          this.#buttonPopup.textContent = this.#initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }

  /**
   * метод для закрытия попапа и сброса форма.
   */
  closePopup() {
    this.#formPopup.reset();
    super.closePopup()
  }
}
