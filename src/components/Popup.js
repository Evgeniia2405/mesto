/**
 * класс Popup отвечает за открытие и закрытие попапа
 */
export default class Popup {

  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  /**
   * публичный метод отвечают за открытие попапа.
   */
  openPopup() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

  /**
   * публичный метод отвечают за закрытие попапа.
   */
  closePopup() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose);
  }

  #handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  #handleClickOverlayPopup = (evt) => {
    if (!evt.target.closest('.popup__container')) {
        this.closePopup();
    }
  }
  /**
   * метод добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
   */
  setEventListeners() {
    const popupCloseButton = this.#popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => {
      this.closePopup();
    });

    this.#popup.addEventListener('mousedown', this.#handleClickOverlayPopup);
  }
}
