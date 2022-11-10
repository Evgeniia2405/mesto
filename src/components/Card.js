/**
 * класс Card создаёт карточку с текстом и ссылкой на изображение
 */
export default class Card {

  #link;
  #name;
  #likes;
  #owner;
  #element;
  #templateElement;
  #likeButton;
  #cardImage;
  #trashButton;
  #cardName;
  #handleCardClick;
  #handleAddLike;
  #handleRemoveLike;
  #handleTrashClick;
  #likeCount;
  #objectCard;
  #usrId;
  #cardId;
  #likeArray;

  constructor(objectCard, templateElement, {handleCardClick, handleAddLike, handleRemoveLike, handleTrashClick}, usrId) {

    this.#link = objectCard.link;
    this.#name = objectCard.name;
    this.#likes = objectCard.likes;
    this.#owner = objectCard.owner;
    this.#objectCard = objectCard;

    this.#cardId = objectCard._id //

    this.#templateElement = templateElement;

    this.#handleCardClick = handleCardClick;

    this.#handleAddLike = handleAddLike;

    this.#handleRemoveLike = handleRemoveLike;

    this.#handleTrashClick = handleTrashClick;

    this.#likeArray = objectCard.likes;
    this.#usrId = usrId;
  }

  #getTemplate() {
    return document.querySelector(this.#templateElement)
    .content.querySelector(".element").cloneNode(true);
  }

  handleDeleteCard() {
    this.#element.remove();
    this.#element = null; // обнуление карточки (обсуждалось в slack), remove() удаляет элемент из DOM, но не удаляет сам элемент, и ссылка на этот элемент по-прежнему храниться в this.#element. И чтобы не получилось утечки в памчти, нужно присвоить null, тогда сборщик мусора в js увидит, что на элемент(объект) никто не ссылается (вспоминаем, что в js объекты храняться по ссылкам)и удалит его на совсем.
  }

  #setStateLike(array) {
    if (array.find(item => item._id === this.#usrId)) {
      this.#likeButton.classList.add('element__like_active-btn');
    } else {
      this.#likeButton.classList.remove('element__like_active-btn');
    }
  }



  #clickLike() {
    if (this.#likeButton.classList.contains('element__like_active-btn')) {
      this.#handleRemoveLike(this)
    } else {
      this.#handleAddLike(this)
    }
  }


  #setEventListeners() {
    this.#cardImage.addEventListener("click", this.#handleCardClick.bind(this));
    this.#likeButton.addEventListener("click", this.#clickLike.bind(this));
    this.#trashButton.addEventListener("click", () => {
      this.#handleTrashClick(this.#cardId)});
    // this.#trashButton.addEventListener("click", this.#handleTrashClick.bind(this, this.#cardId));
  }

  setLikeInfo(array) {
    this.#likeArray = array;
    this.#likeCount.textContent = this.#likeArray.length;
    this.#setStateLike(this.#likeArray);
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
    this.#likeCount = this.#element.querySelector('.element__like-count');

    this.#cardName.textContent = this.#name;
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;

    // определение количества лайков и статус кнопки лайк
    this.#likeCount.textContent = this.#likes.length;
    this.#setStateLike(this.#likes)

    // корзина только у своих карточек
    if (this.#usrId !== this.#owner._id) {
      this.#trashButton.remove();
    }

    this.#setEventListeners();

    return this.#element
  }
}
