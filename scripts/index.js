const content = document.querySelector('.content');

const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');

const profileInfo = content.querySelector('.profile__info');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const popup = content.querySelector('.popup');
const closeButtons = content.querySelectorAll('.popup__close');
const popupEdit = content.querySelector('.popup_type_edit');
const popupAdd = content.querySelector('.popup_type_add');

const popupImages = content.querySelector('.popup__image');
const popupTitleImage = content.querySelector('.popup__title-image');
const popupCard = content.querySelector('.popup_type_card');

const formElementEdit = content.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');

const formElementAdd = content.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_type_place');
const linkInput = formElementAdd.querySelector('.popup__input_type_link');

// START 1. Шесть карточек «из коробки»
const elementsGrid = document.querySelector('.elements__grid');
const elementTemplate = document.querySelector('.element-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function handleEdit(e) {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleAdd(e) {
  popupAdd.classList.add('popup_opened');
}

function handleClose(e) {
  const popupElement = e.target.closest('.popup');
  popupElement.classList.remove('popup_opened');
}

function handleLike(e) {
  const likeElement = e.target;
  likeElement.classList.toggle('element__like_active-btn');
}

function handleDelete(e) {
  const cardElement = e.target.closest('.element');
  cardElement.remove();
}

// ДОБАВЛЕНИЕ КАРТОЧЕК
function addCard(element) {

  const newCardElement = elementTemplate.cloneNode(true);
  const cardName = newCardElement.querySelector('.element__title');
  const cardImage = newCardElement.querySelector('.element__img');

  cardName.textContent = element.name;
  cardImage.src = element.link;

  // ЛАЙКИ
  const likeButton = newCardElement.querySelector('.element__like-btn');
  likeButton.addEventListener('click', handleLike);

  // УДАЛЕНИЕ КАРТОЧКИ
  const trashButton = newCardElement.querySelector('.element__trash-btn');
  trashButton.addEventListener('click', handleDelete);

  // ПОПАП С КАРТИНОКЙ
  cardImage.addEventListener('click', (e) => {
    popupCard.classList.add('popup_opened');
    popupImages.src = element.link;
    popupTitleImage.textContent = element.name;
  });

  elementsGrid.prepend(newCardElement);
}

initialCards.forEach(addCard);

// ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ
editButton.addEventListener('click', handleEdit);

// ПОПАП ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
addButton.addEventListener('click', handleAdd);

// ЗАКРЫТИЕ ПОПАПов
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', handleClose);
});


//ФОРМЫ SUBMIT
function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClose(evt);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const textPlace = placeInput.value;
  const textLink = linkInput.value;
  const newCard = new Object();
  newCard.name = textPlace;
  newCard.link = textLink;

  placeInput.value = '';
  linkInput.value = '';

  addCard(newCard);
  handleClose(evt);
}

formElementAdd.addEventListener('submit', formAddSubmitHandler);

formElementEdit.addEventListener('submit', formEditSubmitHandler);
















