/**
 * класс Card создаёт карточку с текстом и ссылкой на изображение
 */
export default class Card {

  #element;
  #link;
  #name;
  #templateElement;
  #likeButton;
  #cardImage;
  #trashButton;
  #cardName;
  #handleCardClick;

  constructor(objectCard, templateElement, handleCardClick) {
    this.#link = objectCard.link;
    this.#name = objectCard.name;
    this.#templateElement = templateElement;
    this.#handleCardClick = handleCardClick;

  }

  #getTemplate() {
    return document.querySelector(this.#templateElement)
    .content.querySelector(".element").cloneNode(true);
  }

  #handleDeleteCard() {
    this.#element.remove();
    this.#element = null; // обнуление карточки (обсуждалось в slack), remove() удаляет элемент из DOM, но не удаляет сам элемент, и ссылка на этот элемент по-прежнему храниться в this.#element. И чтобы не получилось утечки в памчти, нужно присвоить null, тогда сборщик мусора в js увидит, что на элемент(объект) никто не ссылается (вспоминаем, что в js объекты храняться по ссылкам)и удалит его на совсем.
  }

  #handleLike() {
    this.#likeButton.classList.toggle('element__like_active-btn');
  }

  #setEventListeners() {
    this.#cardImage.addEventListener("click", this.#handleCardClick.bind(this));
    this.#likeButton.addEventListener("click", this.#handleLike.bind(this));
    this.#trashButton.addEventListener("click", this.#handleDeleteCard.bind(this));
  }

  /**
   * функция создания карточки
   * @returns DOM-элемент карточки
   */
  createCard() {
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
