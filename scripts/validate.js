const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, config, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass); //'popup__input_type_error'
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass); //'popup__error_visible'
};

const hideInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass); //'popup__input_type_error'
  errorElement.classList.remove(config.errorClass);   //'popup__error_visible'
  errorElement.textContent = '';
};

// Функция checkInputValidity принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
  // showInputError получает параметром форму, в которой
  // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, config, inputElement.validationMessage);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  }
};

// Функция проверяет наличие невалидного поля
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
  return !inputElement.validity.valid;
  })
};

// Установка атрибута disabled
const setDisableButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', 'disabled');
};

// Усдаление атрибута disabled
const removeDisableButton = (buttonElement) => {
  buttonElement.removeAttribute('disabled', 'disabled');
};

const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    setDisableButton(buttonElement)
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    removeDisableButton(buttonElement)
  }
};

// Функция для очистки текста ошибок после открытия формы ранее закрытой через esc || click in overlay
const resetErrorPopupInput = (formElement) => {
  const popupErrors = formElement.querySelectorAll('.popup__error');
  popupErrors.forEach((popupError) => {
    popupError.textContent = '';
    });
  const popupInputs = formElement.querySelectorAll('.popup__input');
  popupInputs.forEach((popupInput) => {
    popupInput.classList.remove('popup__input_type_error');
    });
};

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ПОЛЯМ ФОРМЫ
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //'.popup__input'
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, config);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); // '.popup__form'
  formList.forEach((formElement) => {
  //     formElement.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  // });
    setEventListeners(formElement, config);
});
}

enableValidation(validationConfig);


