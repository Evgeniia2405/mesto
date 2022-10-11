import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import {
  initialCards,
  cardListSelector,
  validationConfig,
  buttonEdit,
  buttonAdd,
} from "../utils/constants.js";

import "./index.css";

// СОЗДАНИЕ КАРТОЧКИ
function createCard(objectCard) {
  const card = new Card(objectCard, '.element-template', () => {popupWithImage.openPopup(objectCard)});
  const newCardElement = card.createCard();
  return newCardElement;
}

// Секция для отрисовки исходных карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (objectCard) => {
    cardsList.addItem(createCard(objectCard));
    },
  },
  cardListSelector
);
// отрисовка карточек
cardsList.renderItems();

///POPUP карточки
const popupWithImage = new PopupWithImage('.popup_type_card')
popupWithImage.setEventListeners();

///Экземпляр формы добавления новой карточки
const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData)  => {
    cardsList.addItem(createCard(formData));
    },
});
popupAddForm.setEventListeners();

// Открытие попапа с формой добавления новой карточки
buttonAdd.addEventListener('click', () => {
  popupAddForm.openPopup(); // открываем попап добавления карточки
  formValidators['popup-add'].resetValidation()
});

///Экземпляр профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});


///Экземпляр формы редактирования профиля
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formData)  => {
    userInfo.setUserInfo(formData);
    },
});
popupEditForm.setEventListeners();

// Открытие попапа с формой редактирования профиля
buttonEdit.addEventListener('click', () => {
  popupEditForm.openPopup();
  userInfo.getUserInfo();
  formValidators['popup-edit'].resetValidation()
});


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




