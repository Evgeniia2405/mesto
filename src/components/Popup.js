export default class Popup {

  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

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

  setEventListeners() {
    const popupCloseButton = this.#popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => {
      this.closePopup();
    });

    this.#popup.addEventListener('mousedown', this.#handleClickOverlayPopup);
  }
}
