import {popupCard, popupImages, popupTitleImage, openPopup} from "./index.js";

export default class Card {
  static template = document.querySelector('.element-template').content;

  #element
  #link;
  #name;

  constructor(objectCard) {
    this.#link = objectCard.link;
    this.#name = objectCard.name;
  }


  #handleDeleteCard() {
    this.#element.remove();
  }

  #handleLike() {
    this.likeButton.classList.toggle('element__like_active-btn');
  }

  #handleImageClick() {
    openPopup(popupCard);
    popupImages.src = this.#link;
    popupImages.alt = this.#name;
    popupTitleImage.textContent = this.#name;
  };


  #setEventListeners() {

    this.cardImage.addEventListener("click", this.#handleImageClick.bind(this));

    this.likeButton.addEventListener("click", this.#handleLike.bind(this));

    this.trashButton.addEventListener("click", this.#handleDeleteCard.bind(this));

  }

  createCard() {
    this.#element = this.constructor.template.cloneNode(true).children[0];

    this.cardName = this.#element.querySelector('.element__title');
    this.cardImage = this.#element.querySelector('.element__img');

    this.likeButton = this.#element.querySelector('.element__like-btn');
    this.trashButton = this.#element.querySelector('.element__trash-btn');

    this.cardName.textContent = this.#name;
    this.cardImage.src = this.#link;
    this.cardImage.alt = this.#name;

    this.#setEventListeners()

    return this.#element
  }
}
