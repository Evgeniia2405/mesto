// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

// const formElementEdit = content.querySelector('.popup__form_type_edit');
// const nameInput = formElementEdit.querySelector('.popup__input_type_name');
// const jobInput = formElementEdit.querySelector('.popup__input_type_job');





// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('popup__input_type_error');
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formElementEdit.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupInput);
  } else {
    // Если проходит, скроем
    hideInputError(popupInput);
  }
};
 //----------------
 formElementEdit.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
});
// Слушатель события input
nameInput.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода,
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
});

jobInput.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода,
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
});
