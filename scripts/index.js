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
const popupImages = content.querySelectorAll('.popup__image');
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

function addCard(element) {

  const newCardElement = elementTemplate.cloneNode(true);
  const cardName = newCardElement.querySelector('.element__title');
  const cardImage = newCardElement.querySelector('.element__img');

  cardName.textContent = element.name;
  cardImage.src = element.link;

  const likeButton = newCardElement.querySelector('.element__like-btn');
  likeButton.addEventListener('click', (e) => {
    const likeElement = e.target;
    console.log(likeElement);
    likeElement.classList.toggle('element__like_active-btn');
  })

  const trashButton = newCardElement.querySelector('.element__trash-btn');
  trashButton.addEventListener('click', (e) => {
    const cardElement = e.target.closest('.element');
    cardElement.remove();
  })


  elementsGrid.prepend(newCardElement)
}

initialCards.forEach(addCard);
// END 1.



function handleEdit(e) {  // приходит событие event потому что это обработчик клика
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleAdd(e) {  // приходит событие event потому что это обработчик клика
  popupAdd.classList.add('popup_opened');
}

function handleClose(e) {
  const popupElement = e.target.closest('.popup');
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', handleEdit)
addButton.addEventListener('click', handleAdd)

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', handleClose)
});


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

  placeInput.value = ''; // для красоты очищаем поле после добавления данных
  linkInput.value = '';

  addCard(newCard);
  handleClose(evt);
}

// function handleTrash(e) {
//   const cardElement = e.target.closest('.element');
//   console.log(e.target);
//   console.log(cardElement);
//   cardElement.remove();
// }

// likeButton.addEventListener('click', console.log('click'));



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAdd.addEventListener('submit', formAddSubmitHandler);

formElementEdit.addEventListener('submit', formEditSubmitHandler);
















