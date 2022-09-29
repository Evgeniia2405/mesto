import { initialCards } from "./initial_cards.js";
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__edit-button');
const buttonAdd = content.querySelector('.profile__add-button');

const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const popups = content.querySelectorAll('.popup');

const buttonsClose = content.querySelectorAll('.popup__close');
const popupEdit = content.querySelector('.popup_type_edit');
const popupAdd = content.querySelector('.popup_type_add');

// const buttonSavePopup = content.querySelector('.popup__button_save');
// const buttonAddPopup = content.querySelector('.popup__button_add');

export const popupImages = content.querySelector('.popup__image');
export const popupTitleImage = content.querySelector('.popup__title-image');
export const popupCard = content.querySelector('.popup_type_card');


const formElementEdit = content.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');

const formElementAdd = content.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_type_place');
const linkInput = formElementAdd.querySelector('.popup__input_type_link');

const elementsGrid = document.querySelector('.elements__grid');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  popupErrorSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formValidator = (...args) => new FormValidator(...args);

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); // '.popup__form'
formList.forEach((formElement) => {

  formValidator(validationConfig, formElement).enableValidation();
});




function closePopup(popupElement) {
  document.removeEventListener('keydown', handleKeydownEsc);
  popupElement.removeEventListener('click', handleClickOverlayPopup);
  popupElement.classList.remove('popup_opened');
}

// Функция закрытия через Esc
function handleKeydownEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {  // ищем открытый попап
        closePopup(popup)
      }
    })
}
}

// Функция закрытия через клик вне область формы/картинки попапа
function handleClickOverlayPopup(evt) {
  if (!evt.target.closest('.popup__container')) {
        closePopup(evt.target.closest('.popup'));
      }
  }

  export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydownEsc);
  popupElement.addEventListener('click', handleClickOverlayPopup);
}

// СОЗДАНИЕ КАРТОЧКИ
function createCard(objectCard) {
  const newCardElement = new Card(objectCard).createCard();
  return newCardElement;
}

// ДОБАВЛЕНИЕ КАРТОЧКИ НА СТРАНИЦУ
function renderCard(objectCard) {
  const createdCard = createCard(objectCard);
  elementsGrid.prepend(createdCard);
}

// ЗАГРУЗКА КАРТОЧЕК ИЗ "КОРОБКИ" НА СТРАНИЦУ
initialCards.forEach((objectCard) => renderCard(objectCard));


// ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ
buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit); // открываем попап редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidator(validationConfig, popupEdit).resetErrorPopupInput();
});


// ПОПАП ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ,
buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd); // открываем попап добавления карточки
  placeInput.value = '';
  linkInput.value = '';
  formValidator(validationConfig, popupAdd).resetErrorPopupInput();
});


// ЗАКРЫТИЕ ПОПАПОВ ПО КЛИКУ НА КРЕСТИК

// 1. ВАРИАНТ ЗАКРЫТИЯ
// if (buttonsClose.length > 0) {
//   for (let index = 0; index < buttonsClose.length; index++) {
//     const el = buttonsClose[index];
//     el.addEventListener('click', function (e) {
//       closePopup(el.closest('.popup'));
//     });
//   }
// }

// 2. ВАРИАНТ ЗАКРЫТИЯ
// Коллекции NodeList прекрасно поддерживают метод forEach
// с ним смотрится гораздо изящнее:
buttonsClose.forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});


//ФОРМЫ SUBMIT
function handleOpenEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleOpenAddProfileForm(evt) {
  evt.preventDefault();
  const textPlace = placeInput.value;
  const textLink = linkInput.value;
  const newCardObject = new Object();
  newCardObject.name = textPlace;
  newCardObject.link = textLink;

  formElementAdd.reset();    //очистка полей ввода

  renderCard(newCardObject); //Добавляем новую карточку на страницу
  closePopup(popupAdd);
}


formElementAdd.addEventListener('submit', handleOpenAddProfileForm);

formElementEdit.addEventListener('submit', handleOpenEditProfileForm);







