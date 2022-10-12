/**
 * класс PopupWithImage наследует от Popup
 */
import {
  popupImages,
  popupTitleImage,
} from "../utils/constants.js";

import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
  }

  /**
   * метод вставляет в попап картинку с src изображения и подписью к картинке.
   * @param {*} objectCard объектс содержит два свойства: текст имени и ссылку на изображение в формате 'https://pictures.jpg'
   */
  openPopup(objectCard) {
    popupImages.src = objectCard.link;
    popupImages.alt = objectCard.name;
    popupTitleImage.textContent = objectCard.name;
    super.openPopup()
  }
}
