export default class Card {
  // static template = document.querySelector('.element-template').content;
  #element
  #link;
  #name;
  #templateElement;
  #likeButton;
  #cardImage;
  #trashButton;
  #cardName;
  #handlePopupCardOpen;

  constructor(objectCard, templateElement, handlePopupCardOpen) {
    this.#link = objectCard.link;
    this.#name = objectCard.name;
    this.#templateElement = templateElement;
    this.#handlePopupCardOpen = handlePopupCardOpen;
  }

  #getTemplate() {
    return document.querySelector(this.#templateElement)
    .content.querySelector(".element").cloneNode(true);
  }

  #handleCardClick() {
    this.#handlePopupCardOpen(this.#name, this.#link);
  }

  #handleDeleteCard() {
    this.#element.remove();
  }

  #handleLike() {
    this.#likeButton.classList.toggle('element__like_active-btn');
  }

  #setEventListeners() {
    this.#cardImage.addEventListener("click", this.#handleCardClick.bind(this));
    this.#likeButton.addEventListener("click", this.#handleLike.bind(this));
    this.#trashButton.addEventListener("click", this.#handleDeleteCard.bind(this));
  }

  createCard() {
    // this.#element = this.constructor.template.cloneNode(true).children[0];
    this.#element = this.#getTemplate();

    this.#cardName = this.#element.querySelector('.element__title');
    this.#cardImage = this.#element.querySelector('.element__img');

    this.#likeButton = this.#element.querySelector('.element__like-btn');
    this.#trashButton = this.#element.querySelector('.element__trash-btn');

    this.#cardName.textContent = this.#name;
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;

    this.#setEventListeners()

    return this.#element
  }
}
