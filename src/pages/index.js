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

/**
 * функция создания карточки
 * @param {*} objectCard объект с двумя свойствами: текст имени карточки и ссылка на изображение
 * @returns DOM-элемент карточки
 */
function createNewCard(objectCard) {
  const card = new Card(objectCard, '.element-template', () => {popupWithImage.openPopup(objectCard)});
  const newCardElement = card.createCard();
  return newCardElement;
}

/**
 * секция для отрисовки первоначальных карточек на страницу
 */
const cardsList = new Section({
  items: initialCards,
  renderer: (objectCard) => {
    cardsList.addItem(createNewCard(objectCard));
    },
  },
  cardListSelector
);

cardsList.renderItems();

/**
 * экземпляр попапа с картинкой
 */
const popupWithImage = new PopupWithImage('.popup_type_card')
popupWithImage.setEventListeners();

/**
 * экземпляр формы добавления новой карточки
 */
const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData)  => {
    cardsList.addItem(createNewCard(formData));
    },
});
popupAddForm.setEventListeners();

/**
 * Открытие попапа с формой добавления новой карточки
 */
buttonAdd.addEventListener('click', () => {
  popupAddForm.openPopup();
  const formAdd = popupAddForm.getFormPopup();
  formValidators[ formAdd.getAttribute('name') ].resetValidation()
});

/**
 * экземпляр UserInfo отвечает за управление отображением информации о пользователе на странице
 */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

/**
 * Экземпляр формы редактирования профиля
 */
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formData)  => {
    userInfo.setUserInfo(formData);
    },
});
popupEditForm.setEventListeners();

/**
 * Открытие попапа с формой редактирования профиля
 */
buttonEdit.addEventListener('click', () => {
  popupEditForm.openPopup();
  const formEdit = popupEditForm.getFormPopup();
  const objectProfile = userInfo.getUserInfo();
  popupEditForm.setInputValues(objectProfile);
  formValidators[ formEdit.getAttribute('name') ].resetValidation()
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
