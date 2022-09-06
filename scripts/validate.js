
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


const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
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
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
    setEventListeners(formElement, config);
});
}

enableValidation(validationConfig);


