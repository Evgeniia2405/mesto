import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';

import {
  cardListSelector,
  validationConfig,
  buttonEdit,
  buttonAdd,
  avatarEdit,
  API_OPTIONS,
} from "../utils/constants.js";

import "./index.css";

let usrId = ' '; //переменная для определения Id пользователя
let cardId = ' '; //переменная для определения Id карточки
let cardForDelete = ' '; //элемент карточки под удаление

const api = new Api(API_OPTIONS);

//Экземпляр класса Section
const cardsList = new Section({
  renderer: (objectCard) => {
    cardsList.addItem(createNewCard(objectCard));
  }},
  cardListSelector
);


//Создаём массив с промисами
const promises = [api.getUserInfo(), api.getInitialCards()]
// Передаём массив с промисами методу Promise.all
Promise.all(promises)
  .then(([userData, CardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData);
    usrId = userData._id
    console.log('inetr',usrId)
    cardsList.renderItems(CardsData);
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  });


/**
 * функция создания карточки


 */
function createNewCard(objectCard) {
  const card = new Card(objectCard, '.element-template', {
    handleCardClick: () => {
      popupWithImage.openPopup(objectCard)
    },

    handleAddLike: () => {
      api.addLikeCard(objectCard._id)
      .then(objectCard => {
        card.setLikeInfo(objectCard.likes);
      })
      .catch((err) => {
        console.log('Ошибка при добавлении Like карточки', err);
    });},

    handleRemoveLike: () => {
      api.removeLikeCard(objectCard._id)
      .then(objectCard => {
        card.setLikeInfo(objectCard.likes);
      })
      .catch((err) => {
        console.log('Ошибка при удалении Like карточки', err);
    });},

    handleTrashClick: () => {
      popupConfirmForm.openPopup(objectCard);
      cardId = objectCard._id;
      cardForDelete = card
    }
  },
  usrId
  );
  const newCardElement = card.createCard();
  return newCardElement;
}

/**
 * экземпляр попапа с картинкой
 */
const popupWithImage = new PopupWithImage('.popup_type_card')
popupWithImage.setEventListeners();

/**
 * Открытие попапа с формой добавления новой карточки
 */
buttonAdd.addEventListener('click', () => {
  popupAddForm.openPopup();
  const formAdd = popupAddForm.getFormPopup();
  formValidators[ formAdd.getAttribute('name') ].resetValidation()
});

/**
 * экземпляр формы добавления новой карточки
 */
const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData)  => {
    api.createCard(formData.name, formData.link).then(formData => {
    cardsList.addItem(createNewCard(formData));
  }).catch((err) => {
    console.log('Ошибка при добавлении новой карточки', err);
  });
},
});
popupAddForm.setEventListeners();

/**
 * экземпляр UserInfo отвечает за управление отображением информации о пользователе на странице
 */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
});

/**
 * Экземпляр формы редактирования профиля
 */
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formData)  => {
    popupEditForm.renderLoading(true);
    api.editUserInfo(formData.name, formData.about)
    .then(formData => {
      userInfo.setUserInfo(formData);
    }).catch((err) => {
      console.log('Ошибка при редактировании профиля', err);
    }).finally(() => {
      popupEditForm.renderLoading(false);
      });
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

/**
 * Открытие попапа с формой редактирования аватара
 */
avatarEdit.addEventListener('click', () => {
  popupAvatarForm.openPopup();
  const formAvatar = popupAvatarForm.getFormPopup();
  formValidators[ formAvatar.getAttribute('name') ].resetValidation()
});

/**
 * экземпляр формы редактирования аватара
 */
const popupAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formData)  => {
    api.editUserAvatar(formData.avatar).then(formData => {
      userInfo.setUserAvatar(formData);
    }).catch((err) => {
      console.log('Ошибка при редактировании аватара', err);
    });
    },
});
popupAvatarForm.setEventListeners();

/**
 * экземпляр формы подтверждения удаления карточки
 */
const popupConfirmForm = new PopupWithForm({
  popupSelector: '.popup_type_confirmation',
  handleFormSubmit: ()  => {
    api.deleteCard(cardId).then(() => { // cardId определяем в экземпляре Card
      cardForDelete.handleDeleteCard();// cardForDelete определяем в экземпляре Card
  })
  .catch((err) => {
    console.log('Ошибка при удалении Like карточки', err);
  });
  },
});
popupConfirmForm.setEventListeners();


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
