/**
 * класс PopupWithImage наследует от Popup
 */
import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  #popup;
  #popupImage;
  #popupTitleImage;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#popupImage = this.#popup.querySelector('.popup__image');
    this.#popupTitleImage = this.#popup.querySelector('.popup__title-image');
  }

  /**
   * метод вставляет в попап картинку с src изображения и подписью к картинке.
   * @param {*} objectCard объектс содержит два свойства: текст имени и ссылку на изображение в формате 'https://pictures.jpg'
   */
  openPopup(objectCard) {
    this.#popupImage.src = objectCard.link;
    this.#popupImage.alt = objectCard.name;
    this.#popupTitleImage.textContent = objectCard.name;
    super.openPopup()
  }
}
