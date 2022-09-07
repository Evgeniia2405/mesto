const content = document.querySelector('.content');

const buttonEdit = content.querySelector('.profile__edit-button');
const buttonAdd = content.querySelector('.profile__add-button');

const profileInfo = content.querySelector('.profile__info');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const popups = content.querySelectorAll('.popup');


const buttonsClose = content.querySelectorAll('.popup__close');
const popupEdit = content.querySelector('.popup_type_edit');
const popupAdd = content.querySelector('.popup_type_add');


const buttonSavePopup = content.querySelector('.popup__button_save');
const buttonAddPopup = content.querySelector('.popup__button_add');


const popupImages = content.querySelector('.popup__image');
const popupTitleImage = content.querySelector('.popup__title-image');
const popupCard = content.querySelector('.popup_type_card');

const formElementEdit = content.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');

const formElementAdd = content.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_type_place');
const linkInput = formElementAdd.querySelector('.popup__input_type_link');

const popupErrors = content.querySelectorAll('.popup__error');


const elementsGrid = document.querySelector('.elements__grid');
const elementTemplate = document.querySelector('.element-template').content;

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


function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydownEsc);
  popupElement.addEventListener('click', handleClickOverlayPopup);
  const buttonPopupDisabled = popupElement.querySelector('.popup__button_disabled');
}



function handleLike(e) {
  const likeElement = e.target;
  likeElement.classList.toggle('element__like_active-btn');
}

function handleDeleteCard(e) {
  const cardElement = e.target.closest('.element');
  cardElement.remove();
}

// СОЗДАНИЕ КАРТОЧКИ
function createCard(element) {

  const newCardElement = elementTemplate.cloneNode(true);
  const cardName = newCardElement.querySelector('.element__title');
  const cardImage = newCardElement.querySelector('.element__img');

  cardName.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  // ЛАЙКИ
  const likeButton = newCardElement.querySelector('.element__like-btn');
  likeButton.addEventListener('click', handleLike);

  // УДАЛЕНИЕ КАРТОЧКИ
  const trashButton = newCardElement.querySelector('.element__trash-btn');
  trashButton.addEventListener('click', handleDeleteCard);

  // ПОПАП С КАРТИНОКЙ
  cardImage.addEventListener('click', (e) => {
    openPopup(popupCard);
    popupImages.src = element.link;
    popupImages.alt = element.name;
    popupTitleImage.textContent = element.name;
  });

  return newCardElement;
}

// ФУНКЦИЯ ЗАГРУЗКИ КАРТОЧЕК НА СТРАНИЦУ
function renderCard(cardElement) {
  elementsGrid.prepend(createCard(cardElement));
}

// ЗАГРУЗКА КАРТОЧЕК ИЗ "КОРОБКИ" НА СТРАНИЦУ
initialCards.forEach(renderCard);


// ПОПАП РЕДАКТИРОВАНИЕ ПРОФИЛЯ
buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit); // открываем попап редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  buttonSavePopup.classList.remove('popup__button_disabled');
  resetErrorPopupInput(popupEdit);
});


// ПОПАП ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd); // открываем попап добавления карточки
  placeInput.value = '';
  linkInput.value = '';
  buttonAddPopup.classList.add('popup__button_disabled');
  resetErrorPopupInput(popupAdd);
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







