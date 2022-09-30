import { initialCards } from "./initialCards.js";
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__edit-button');
const buttonAdd = content.querySelector('.profile__add-button');

const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const popups = content.querySelectorAll('.popup');

const closeButtons = content.querySelectorAll('.popup__close'); // ex buttonsClose
const popupEdit = content.querySelector('.popup_type_edit');
const popupAdd = content.querySelector('.popup_type_add');

const popupImages = content.querySelector('.popup__image');
const popupTitleImage = content.querySelector('.popup__title-image');
const popupCard = content.querySelector('.popup_type_card');


const formEditPopup = content.querySelector('.popup__form_type_edit'); //ex formElementEdit
const nameInput = formEditPopup.querySelector('.popup__input_type_name');
const jobInput = formEditPopup.querySelector('.popup__input_type_job');

const formAddPopup = content.querySelector('.popup__form_type_add'); //ex formElementAdd
const placeInput = formAddPopup.querySelector('.popup__input_type_place');
const linkInput = formAddPopup.querySelector('.popup__input_type_link');

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

////ВАЛИДАЦИЯ
/////////// VAR - 0 - НЕУДАЧНЫЙ ///////////////
// const formValidator = (...args) => new FormValidator(...args);

// const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); // '.popup__form'
// formList.forEach((formElement) => {

//   formValidator(validationConfig, formElement).enableValidation();
// });

/////////// VAR - 1 ///////////////
// const formAddValidator = new FormValidator(validationConfig, formAddPopup);
// const formEditValidator = new FormValidator(validationConfig, formEditPopup);

// formAddValidator.enableValidation();
// formEditValidator.enableValidation();

//  VAR - 2 УНИВЕРСАЛЬНЫЙ МЕТОД СОЗДАНИЯ ЭКЗЕМПЛЯРОВ ВАЛИДАТОРОВ ВСЕХ ФОРМ (поместив их все в один объект, а потом брать из него валидатор по атрибуту name, который задан для формы).

const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

///////////////////////////////////////////////////

function closePopup(popupElement) {
  document.removeEventListener('keydown', handleKeydownEsc);
  popupElement.removeEventListener('mousedown', handleClickOverlayPopup); //событие 'mousedown', а не click, чтобы не закрыть случайно попап по оверлею, если нажать мышкой внутри попапа, а потом, не разжимая, передвинуть курсор на оверлей.
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

function handlePopupCardOpen(name, link) {
  popupImages.src = link;
  popupImages.alt = name;
  popupTitleImage.textContent = name;
  openPopup(popupCard);
}


function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydownEsc);
  popupElement.addEventListener('mousedown', handleClickOverlayPopup); //событие 'mousedown', а не click, чтобы не закрыть случайно попап по оверлею, если нажать мышкой внутри попапа, а потом, не разжимая, передвинуть курсор на оверлей.
}

// СОЗДАНИЕ КАРТОЧКИ
function createCard(objectCard) {
  const newCardElement = new Card(objectCard, '.element-template', handlePopupCardOpen).createCard();
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
  // formEditValidator.resetValidation(); // for VAR - 1
  formValidators[ formEditPopup.getAttribute('name') ].resetValidation() // for VAR - 2
});


// ПОПАП ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ,
buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd); // открываем попап добавления карточки
  formAddPopup.reset();
  // formAddValidator.resetValidation(); // for VAR - 1
  formValidators[ formAddPopup.getAttribute('name') ].resetValidation() // for VAR - 2
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
closeButtons.forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});



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

  formAddPopup.reset();    //очистка полей ввода

  renderCard(newCardObject); //Добавляем новую карточку на страницу
  closePopup(popupAdd);
}


formAddPopup.addEventListener('submit', handleOpenAddProfileForm);

formEditPopup.addEventListener('submit', handleOpenEditProfileForm);







