export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  popupErrorSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const API_OPTIONS = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
      authorization: 'e157ce8e-c830-48fc-81a0-0ff04f7cdd6a',
      'Content-Type': 'application/json'
    },
}

export const cardListSelector = '.elements__grid';
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const avatarEdit = document.querySelector('.profile__avatar');
