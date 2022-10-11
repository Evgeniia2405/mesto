import {
  popupImages,
  popupTitleImage,
} from "../utils/constants.js";

import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(objectCard) {
    popupImages.src = objectCard.link;
    popupImages.alt = objectCard.name;
    popupTitleImage.textContent = objectCard.name;
    super.openPopup()
  }
}
