const content = document.querySelector('.content');

const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');


const profileInfo = content.querySelector('.profile__info');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');


const popup = content.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const popupEdit = content.querySelector('.popup_type_edit');
const popupAdd = content.querySelector('.popup_type_add');

const formElement = content.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const placeInput = formElement.querySelector('.popup__input_type_place');
const linkInput = formElement.querySelector('.popup__input_type_link');


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

initialCards.forEach(function (element) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__img').src = element.link;

  elementsGrid.append(cardElement)
})

// открытие закрытие popup через toggle (см. вебинар Егор Шкиря 06.08)
// let togglePopup = function () {
//  popup.classList.toggle('popup_opened');
// }
// editButton.addEventListener('click',togglePopup);
// closeButton.addEventListener('click',togglePopup);


// const openPopup = function () {
//   popup.classList.add('popup_opened');
// }

const openPopupEdit = function () {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
const openPopupAdd = function () {
  popupAdd.classList.add('popup_opened');
}

let closePopup = function () {
  popup.classList.remove('popup_opened');
}

// закрытие popup через клик в область вне окна редактирования профиля
// см. вебинар Егор Шкиря 06.08
//popup.addEventListener('click', function(event) {
// console.log('###event', event);
// console.log('###event.target', event.target);
// console.log('###event.curentTarget', event.currentTarget);
// if (event.target === event.currentTarget) {
//   closePopup();
// }
//} );

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButton.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

